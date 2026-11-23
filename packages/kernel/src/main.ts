// Process entry: the one place that touches process.argv, stdin, stdout and the exit code.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { callBoundaryChild, callTimeoutResponse, runBoundedCall } from "./adapters/call-boundary.ts";
import { runCallChild } from "./adapters/call-entry.ts";

declare const TENET_RUNTIME_SHA256: string;

const launcher = fileURLToPath(import.meta.url);
const built = typeof TENET_RUNTIME_SHA256 === "string";
const runtime = built
  ? join(dirname(launcher), "tenet-runtime.mjs")
  : join(dirname(launcher), "adapters/runtime-entry.ts");
if (built) {
  const runtimeSha256 = createHash("sha256").update(readFileSync(runtime)).digest("hex");
  if (runtimeSha256 !== TENET_RUNTIME_SHA256) throw new Error("kernel runtime bundle does not match the command launcher");
}

const write = (stream: NodeJS.WritableStream, text: string) =>
  new Promise<void>((resolve) => { stream.write(text, () => resolve()); });

if (callBoundaryChild()) {
  process.env.TENET_CALL_BOUNDARY_ARTIFACT = launcher;
  const { response, code } = await runCallChild(process.argv.slice(2), process.stdin, process.env, process.execArgv);
  await write(process.stdout, `${JSON.stringify(response)}\n`);
  process.exitCode = code;
} else {
  const result = await runBoundedCall({
    script: launcher,
    argv: process.argv.slice(2),
    cwd: process.cwd(),
    env: { ...process.env, TENET_CALL_BOUNDARY_ARTIFACT: launcher },
    execArgv: process.execArgv,
    timeoutMs: 5_000,
  });
  if (result.timedOut) {
    const response = callTimeoutResponse(process.argv[2] ?? "");
    await write(process.stdout, `${JSON.stringify(response)}\n`);
    await write(process.stderr, `${result.stderr}\n`);
    process.exitCode = 5;
  } else {
    if (result.stdout) await write(process.stdout, result.stdout);
    if (result.stderr) await write(process.stderr, result.stderr);
    process.exitCode = result.code;
  }
}
