import { spawn } from 'node:child_process';

export async function runBoundaryChild(wrapper, args, env) {
 const child = spawn(process.execPath, [wrapper, ...args], {
  cwd: process.cwd(),
  env: { ...env, TENET_CALL_BOUNDARY_CHILD: '1' },
  detached: process.platform !== 'win32',
  stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
 });
 child.stdout.pipe(process.stdout);
 child.stderr.pipe(process.stderr);
 process.stdin.pipe(child.stdin);
 child.on('message', message => {
  if (
   message && typeof message === 'object' &&
   (message.tenet === 'external-start' || message.tenet === 'external-end') &&
   Number.isSafeInteger(message.id)
  ) child.send({ tenet: 'external-ack', id: message.id });
 });
 const result = await new Promise((resolve, reject) => {
  child.once('error', reject);
  child.once('close', (status, signal) => resolve({ status, signal }));
 });
 process.exitCode = result.signal || result.status === null ? 5 : result.status;
}
