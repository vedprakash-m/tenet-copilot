import { fileURLToPath } from "node:url";
import { callBoundaryChild } from "./call-boundary.ts";
import { runCallRuntime } from "./call-runtime.ts";

export { runCallRuntime };

const write = (stream: NodeJS.WritableStream, text: string) =>
  new Promise<void>((resolve) => { stream.write(text, () => resolve()); });

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (!callBoundaryChild()) {
    process.stderr.write("The private kernel runtime requires the launcher-created IPC boundary.\n");
    process.exitCode = 1;
  } else {
    const { response, code } = await runCallRuntime(
      process.argv.slice(2), process.stdin, process.env, process.execArgv,
    );
    await write(process.stdout, `${JSON.stringify(response)}\n`);
    process.exitCode = code;
  }
}
