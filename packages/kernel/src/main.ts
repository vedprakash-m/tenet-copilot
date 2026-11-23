// Process entry: the one place that touches process.argv, stdin, stdout and the exit code.
import "./zod-jitless.ts";
import { main } from "./frontends/cli.ts";
import {
  callBoundaryChild, callTimeoutResponse, createPorts, dropGitLocalVars, markExternal, runBoundedCall, watchBoundaryParent,
} from "./wire.ts";
import { VERBS } from "./verbs/index.ts";

const write = (stream: NodeJS.WritableStream, text: string) =>
  new Promise<void>((resolve) => { stream.write(text, () => resolve()); });

if (callBoundaryChild()) {
  dropGitLocalVars(process.env);
  const ports = createPorts(process.cwd());
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
    const { response, code } = await main(process.argv.slice(2), ports, VERBS, process.stdin, process.env, process.execArgv);
    await write(process.stdout, `${JSON.stringify(response)}\n`);
    process.exitCode = code;
  } finally {
    stopParentWatch();
  }
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
