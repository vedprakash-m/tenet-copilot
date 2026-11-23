// Process entry: the one place that touches process.argv, stdin, stdout and the exit code.
import "./zod-jitless.ts";
import { callBoundaryChild, callTimeoutResponse, runBoundedCall } from "./adapters/call-boundary.ts";
import { runCallChild } from "./adapters/call-entry.ts";

const write = (stream: NodeJS.WritableStream, text: string) =>
  new Promise<void>((resolve) => { stream.write(text, () => resolve()); });

if (callBoundaryChild()) {
  const { response, code } = await runCallChild(process.argv.slice(2), process.stdin, process.env, process.execArgv);
  await write(process.stdout, `${JSON.stringify(response)}\n`);
  process.exitCode = code;
} else {
  const result = await runBoundedCall({
    script: process.argv[1]!,
    argv: process.argv.slice(2),
    cwd: process.cwd(),
    env: process.env,
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
