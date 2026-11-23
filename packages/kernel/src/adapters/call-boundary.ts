// A separate process makes the bookkeeping deadline effective even while synchronous work blocks the event loop.
import { spawn, spawnSync } from "node:child_process";
import type { ChildProcess } from "node:child_process";
import type { KernelResponse } from "../core/schemas.ts";

const CHILD = "TENET_CALL_BOUNDARY_CHILD";
const START = "external-start";
const END = "external-end";
const ACK = "external-ack";
let notification = 0;

export interface BoundedCallResult {
  timedOut: boolean;
  code: number;
  stdout: string;
  stderr: string;
  signal: NodeJS.Signals | null;
}

export interface BoundedCall {
  script: string;
  argv: string[];
  cwd: string;
  env: NodeJS.ProcessEnv;
  timeoutMs: number;
  execArgv?: readonly string[];
}

function killTree(child: ChildProcess): void {
  if (!child.pid) return;
  if (process.platform !== "win32") {
    try { process.kill(-child.pid, "SIGKILL"); return; } catch { /* the child may already be gone */ }
  }
  try {
    const killed = spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
      stdio: "ignore",
      windowsHide: true,
      timeout: 5_000,
    });
    if (killed.status === 0) return;
  } catch { /* fall through to the direct worker kill */ }
  try { child.kill("SIGKILL"); } catch { /* the child may already be gone */ }
}

/** The sole place that returns a whole-call timeout. The worker is stopped before this function settles. */
export function runBoundedCall(call: BoundedCall): Promise<BoundedCallResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [...(call.execArgv ?? process.execArgv), call.script, ...call.argv], {
      cwd: call.cwd,
      env: { ...call.env, [CHILD]: "1" },
      detached: process.platform !== "win32",
      stdio: ["inherit", "pipe", "pipe", "ipc"],
    });
    let stdout = "";
    let stderr = "";
    let remaining = call.timeoutMs;
    let segmentStarted = performance.now();
    let timer: ReturnType<typeof setTimeout> | undefined;
    let external = false;
    let timedOut = false;
    let finished = false;

    const arm = () => {
      segmentStarted = performance.now();
      timer = setTimeout(() => {
        timedOut = true;
        killTree(child);
      }, Math.max(0, remaining));
    };
    const pause = () => {
      if (external) return;
      remaining = Math.max(0, remaining - (performance.now() - segmentStarted));
      if (timer) clearTimeout(timer);
      timer = undefined;
      external = true;
    };
    const resume = () => {
      if (!external) return;
      external = false;
      arm();
    };

    child.stdout!.setEncoding("utf8");
    child.stderr!.setEncoding("utf8");
    child.stdout!.on("data", (chunk: string) => { stdout += chunk; });
    child.stderr!.on("data", (chunk: string) => { stderr += chunk; });
    child.on("message", (message: unknown) => {
      if (!message || typeof message !== "object" || !("tenet" in message)) return;
      if (message.tenet === START) pause();
      if (message.tenet === END) resume();
      if ((message.tenet === START || message.tenet === END) &&
          "id" in message && Number.isSafeInteger(message.id)) {
        child.send({ tenet: ACK, id: message.id });
      }
    });
    child.once("error", reject);
    child.once("close", (code, signal) => {
      if (finished) return;
      finished = true;
      if (timer) clearTimeout(timer);
      if (timedOut) {
        resolve({
          timedOut: true,
          code: 5,
          stdout: "",
          stderr: `Kernel bookkeeping call exceeded ${call.timeoutMs} ms; one defined timeout was returned ` +
            "only after the call process group stopped.",
          signal,
        });
      } else {
        resolve({ timedOut: false, code: code ?? 5, stdout, stderr, signal });
      }
    });
    arm();
  });
}

export const callBoundaryChild = (): boolean => process.env[CHILD] === "1" && typeof process.send === "function";

function stopSelfTree(): void {
  if (process.platform !== "win32") {
    try { process.kill(-process.pid, "SIGKILL"); return; } catch { /* fall through to the direct kill */ }
  } else {
    const stopped = spawnSync("taskkill", ["/pid", String(process.pid), "/T", "/F"], {
      stdio: "ignore", windowsHide: true, timeout: 5_000,
    });
    if (stopped.status === 0) return;
  }
  process.kill(process.pid, "SIGKILL");
}

/** A detached bounded child must not survive a parent that died before releasing the call boundary. */
export function watchBoundaryParent(onLoss: () => void | Promise<void> = () => {}): () => void {
  if (!callBoundaryChild()) return () => {};
  const parent = process.ppid;
  let stopping = false;
  const disconnect = () => {
    if (stopping) return;
    stopping = true;
    clearInterval(timer);
    process.off("disconnect", disconnect);
    void Promise.resolve(onLoss()).then(stopSelfTree, stopSelfTree);
  };
  const timer = setInterval(() => {
    try { process.kill(parent, 0); } catch { disconnect(); }
  }, 10);
  timer.unref();
  process.once("disconnect", disconnect);
  return () => {
    clearInterval(timer);
    process.off("disconnect", disconnect);
  };
}

export function callTimeoutResponse(verb: string): KernelResponse {
  return {
    verb,
    exit: 5,
    revision: 0,
    reasons: [{
      code: "internal-error",
      message: "The kernel bookkeeping call exceeded 5 seconds; the call process was stopped. " +
        "Any interrupted effect is uncertain and will be reconciled by the next mutating call.",
    }],
    next: [],
    budget: { attempts: "0/0", rounds: "0/0", delegations: "0/0" },
    effects: {
      completed: [],
      uncertain: ["The call was terminated at the whole-call deadline; interrupted work is not known to have completed."],
      recovery: "Repeat a mutating call to reconcile any recorded intent before dependent work.",
    },
  };
}

/** External jobs own their obligation deadline; they suspend, rather than reset, the bookkeeping budget. */
export function markExternal(active: boolean): Promise<void> {
  if (!process.send) return Promise.resolve();
  const id = ++notification;
  return new Promise((resolve, reject) => {
    const received = (message: unknown) => {
      if (!message || typeof message !== "object" ||
          !("tenet" in message) || message.tenet !== ACK ||
          !("id" in message) || message.id !== id) return;
      process.off("message", received);
      resolve();
    };
    process.on("message", received);
    process.send!({ tenet: active ? START : END, id }, (error) => {
      if (!error) return;
      process.off("message", received);
      reject(error);
    });
  });
}
