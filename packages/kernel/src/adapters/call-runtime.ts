import "../zod-jitless.ts";
import { main } from "../frontends/cli.ts";
import { VERBS } from "../verbs/index.ts";
import { createPorts, dropGitLocalVars, markExternal } from "../wire.ts";
import { watchBoundaryParent } from "./call-boundary.ts";

export async function runCallRuntime(argv: string[], stdin: NodeJS.ReadableStream, env: NodeJS.ProcessEnv, execArgv: string[]) {
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
