import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const ROOT = join(import.meta.dirname, "../../..");

describe("built payload-only rules [SEC-03, SEC-07]", () => {
  it("contains no runtime network client import beyond the admitted source boundary", () => {
    const bundles = ["tenet.mjs", "tenet-runtime.mjs"].map(name => join(ROOT, "plugin/kernel", name));
    assert.ok(bundles.reduce((size, bundle) => size + statSync(bundle).size, 0) <= 900 * 1024);
    for (const bundle of bundles)
      assert.doesNotMatch(readFileSync(bundle, "utf8"), /from ["']node:(?:http|https|http2|tls)["']|import\(["']node:(?:net|http|https)["']\)/);
  });

  it("keeps the public command launcher lightweight [NFR-01]", () => {
    assert.ok(statSync(join(ROOT, "plugin/kernel/tenet.mjs")).size <= 20 * 1024);
  });

  it("refuses to run the private runtime without the public call boundary [NFR-01]", () => {
    const result = spawnSync(process.execPath, [
      join(ROOT, "plugin/kernel/tenet-runtime.mjs"), "inspect", "help",
    ], { encoding: "utf8" });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /launcher-created IPC boundary/);
  });
});
