// Become the bounded call's script so the fault hook runs in the child that owns the transaction lock.
import fs from 'node:fs';
import { syncBuiltinESMExports } from 'node:module';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const child = process.env.TENET_CALL_BOUNDARY_CHILD === '1';
const wrapper = fileURLToPath(import.meta.url);
if (child) {
 const point = process.env.TENET_UAT_BRIDGE_CRASH_POINT;
 const bundle = process.env.TENET_UAT_BRIDGE_BUNDLE;
 const dir = join(process.cwd(), '.tenet');
 const link = fs.linkSync;
 const sync = () => {
  const fd = fs.openSync(dir, 'r'); try { fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
 };
 const replace = (name, text) => {
  const fd = fs.openSync(join(dir, `${name}.tmp`), 'wx', 0o600);
  try { fs.writeFileSync(fd, text); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
  fs.renameSync(join(dir, `${name}.tmp`), join(dir, name)); sync();
 };
 fs.linkSync = (from, to) => {
  link(from, to);
  if (basename(String(to)) !== 'lock' || fs.realpathSync(dirname(String(to))) !== fs.realpathSync(dir)) return;
  replace('migration-transition.json', '{}');
  if (point !== 'before-terminal') replace('migration-terminal.json', JSON.stringify({
   operationId: 'a'.repeat(32), protocolVersion: 1, versions: { from: 2, to: 1 },
   outcome: 'rolled-back', bindingDigest: 'b'.repeat(64),
  }));
  if (point === 'after-fence-removal') { fs.rmSync(join(dir, 'migration-transition.json')); sync(); }
  process.kill(process.pid, 'SIGKILL');
 };
 syncBuiltinESMExports();
 process.argv = [process.execPath, bundle, ...process.argv.slice(2)];
 await import(pathToFileURL(bundle).href);
} else {
 const [bundle, point, ...args] = process.argv.slice(2);
 process.env.TENET_UAT_BRIDGE_BUNDLE = bundle;
 process.env.TENET_UAT_BRIDGE_CRASH_POINT = point;
 process.argv = [process.execPath, wrapper, ...args];
 await import(pathToFileURL(bundle).href);
}
