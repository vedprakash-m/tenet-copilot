import assert from "node:assert/strict";
import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { after, describe, it } from "node:test";
import { callBoundaryChild, callTimeoutResponse, runBoundedCall } from "../src/adapters/call-boundary.ts";
import { KernelResponse } from "../src/core/schemas.ts";
import { cleanup, tmp } from "./helpers.ts";

const roots: string[] = [];
const fixture = () => { const root = tmp("tenet-call-boundary-"); roots.push(root); return root; };
after(() => roots.forEach(cleanup));

describe("whole-call process boundary [NFR-01]", () => {
  it("does not trust an inherited child marker without the parent IPC boundary", () => {
    const before = process.env.TENET_CALL_BOUNDARY_CHILD;
    process.env.TENET_CALL_BOUNDARY_CHILD = "1";
    try { assert.equal(callBoundaryChild(), false); }
    finally {
      if (before === undefined) delete process.env.TENET_CALL_BOUNDARY_CHILD;
      else process.env.TENET_CALL_BOUNDARY_CHILD = before;
    }
  });

  it("kills a hung call and its continuing child before returning timeout", async () => {
    const root = fixture();
    const marker = join(root, "continued.txt");
    const script = join(root, "hung.mjs");
    writeFileSync(script, [
      "import { spawnSync, spawn } from 'node:child_process';",
      "import { writeFileSync } from 'node:fs';",
      `spawn(process.execPath, ["-e", ${JSON.stringify(
        `setTimeout(() => require("node:fs").writeFileSync(${JSON.stringify(marker)}, "continued"), 300)`,
      )}], { stdio: "ignore" });`,
      "spawnSync(process.execPath, ['-e', 'Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 10000)']);",
    ].join("\n"));

    const result = await runBoundedCall({
      script, argv: ["inspect"], cwd: root, env: process.env, timeoutMs: 100,
    });
    assert.equal(result.timedOut, true);
    assert.equal(result.code, 5);
    assert.match(result.stderr, /bookkeeping call exceeded 100 ms/i);
    await new Promise((resolve) => setTimeout(resolve, 450));
    assert.equal(existsSync(marker), false);
  });

  it("pauses the bookkeeping deadline while an external job owns the bounded work", async () => {
    const root = fixture();
    const script = join(root, "external.mjs");
    writeFileSync(script, [
      `const { markExternal } = await import(${JSON.stringify(
        new URL("../src/adapters/call-boundary.ts", import.meta.url).href,
      )});`,
      "await markExternal(true);",
      "await new Promise((resolve) => setTimeout(resolve, 150));",
      "await markExternal(false);",
      "process.stdout.write('done\\n');",
    ].join("\n"));

    const result = await runBoundedCall({
      script, argv: [], cwd: root, env: process.env, timeoutMs: 100,
    });
    assert.equal(result.timedOut, false);
    assert.equal(result.code, 0);
    assert.equal(result.stdout, "done\n");
  });

  it("returns once with a timeout even when the child emitted success-shaped output first", async () => {
    const root = fixture();
    const script = join(root, "late.mjs");
    writeFileSync(script, [
      "process.stdout.write('{\"exit\":0}\\n');",
      "Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 10000);",
    ].join("\n"));

    const result = await runBoundedCall({
      script, argv: ["inspect"], cwd: root, env: process.env, timeoutMs: 50,
    });
    assert.equal(result.timedOut, true);
    assert.equal(result.code, 5);
    assert.equal(result.stdout, "");
    assert.match(result.stderr, /one defined timeout/i);
    assert.equal(KernelResponse.safeParse(callTimeoutResponse("inspect")).success, true);
  });

  it("preserves a completed call's output and exit without opening a timeout race", async () => {
    const root = fixture();
    const script = join(root, "complete.mjs");
    writeFileSync(script, "process.stdout.write('complete\\n'); process.exitCode = 2;\n");

    const result = await runBoundedCall({
      script, argv: [], cwd: root, env: process.env, timeoutMs: 250,
    });
    assert.deepEqual(result, {
      timedOut: false, code: 2, stdout: "complete\n", stderr: "", signal: null,
    });
  });

});
