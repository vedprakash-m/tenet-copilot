// Child entry for the bounded call. Keep the parent launcher light; the full kernel loads only in the owned child.
export async function runCallChild(argv: string[], stdin: NodeJS.ReadableStream, env: NodeJS.ProcessEnv, execArgv: string[]) {
  const { runCallRuntime } = await import("./call-runtime.ts");
  return runCallRuntime(argv, stdin, env, execArgv);
}
