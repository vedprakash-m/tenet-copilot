// Child entry for the bounded call. Keep the parent launcher light; the full kernel loads only in the owned child.
import { watchBoundaryParent } from "./call-boundary.ts";

export async function runCallChild(argv: string[], stdin: NodeJS.ReadableStream, env: NodeJS.ProcessEnv, execArgv: string[]) {
  await import("../zod-jitless.ts");
  const [{ main }, { VERBS }, { createPorts, dropGitLocalVars, markExternal }] = await Promise.all([
    import("../frontends/cli.ts"), import("../verbs/index.ts"), import("../wire.ts"),
  ]);
  dropGitLocalVars(env);
  const ports = createPorts(process.cwd(), env);
  const stopParentWatch = watchBoundaryParent(async () => {
    const state = ports.store.read()?.state;
    if (!state) return;
    for (const work of Object.values(state.work)) {
      const runDir = work.session.inCall?.runDir;
      if (runDir) await ports.runner.stopRun(runDir);
    }
  });
  try {
    ports.callBoundary = { external: markExternal };
    return await main(argv, ports, VERBS, stdin, env, execArgv);
  } finally {
    stopParentWatch();
  }
}
