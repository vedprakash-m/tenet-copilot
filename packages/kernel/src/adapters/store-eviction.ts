import { closeSync, fsyncSync, lstatSync, openSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { KernelError } from "../core/errors.ts";
import type { EvictReport } from "../ports/types.ts";

type Measure = (path: string) => {
  bytes: number; at: number; identity: string; accounting: "known" | "unknown" | "changed";
};
export type BlobEviction = { path: string; identity: string; bytes: number };

export function storageFootprint(
  dir: string,
  measure: Measure,
): { classes: Array<{ name: string; bytes: number }>; accounting: "known" | "unknown" | "changed" } {
  let accounting: "known" | "unknown" | "changed" = "known";
  const classes: Array<{ name: string; bytes: number }> = [];
  try {
    for (const name of readdirSync(dir)) {
      const current = measure(join(dir, name));
      if (current.accounting !== "known") accounting = current.accounting;
      classes.push({ name, bytes: current.bytes });
    }
  } catch { accounting = "unknown"; }
  return { classes: classes.sort((a, b) => b.bytes - a.bytes), accounting };
}

export function ceilingRefusal(
  projected: number, peak: number, ceiling: number, largest: EvictReport["largest"],
): EvictReport | undefined {
  if (projected <= ceiling && peak <= ceiling) return undefined;
  return {
    overCeiling: true,
    largest,
    refusal: {
      code: "storage-protected-full",
      message: "Tenet's protected and recovery storage reached its 50 MB ceiling. No write was made; " +
        "preserve current data and reduce eligible storage before trying again.",
    },
  };
}

export function blobRefs(values: readonly unknown[]): Set<string> {
  const hashes = new Set<string>();
  const visit = (value: unknown) => {
    if (typeof value === "string") {
      if (/^[a-f0-9]{64}$/.test(value)) hashes.add(value);
      return;
    }
    if (Array.isArray(value)) return value.forEach(visit);
    if (value && typeof value === "object") Object.values(value).forEach(visit);
  };
  values.forEach(visit);
  return hashes;
}

export function aggregateBlobPlan(
  dir: string,
  protectedHashes: ReadonlySet<string>,
  needed: number,
  measure: Measure,
): BlobEviction[] {
  const stat = lstatSync(join(dir, "blobs"), { throwIfNoEntry: false });
  if (!needed || !stat) return [];
  if (!stat.isDirectory() || stat.isSymbolicLink()) {
    throw new KernelError("storage-accounting-unknown",
      "blob storage changed after accounting; no superseded content was removed");
  }
  let names: string[];
  try { names = readdirSync(join(dir, "blobs")); } catch {
    throw new KernelError("storage-accounting-unknown",
      "blob storage cannot be inventoried safely; no superseded content was removed");
  }
  const entries = names.flatMap((name) => {
    const path = join(dir, "blobs", name), current = measure(path);
    if (protectedHashes.has(name)) return [];
    if (!/^[a-f0-9]{64}$/.test(name) || current.accounting !== "known") {
      throw new KernelError("storage-accounting-unknown",
        "blob storage contains an unaccounted record; no superseded content was removed");
    }
    return [{ path, identity: current.identity, bytes: current.bytes, at: current.at }];
  });
  let left = needed;
  return entries.sort((a, b) => a.at - b.at).flatMap((entry) => {
    if (left <= 0) return [];
    left -= entry.bytes;
    return [{ path: entry.path, identity: entry.identity, bytes: entry.bytes }];
  });
}

export function evictBlobPlan(planned: readonly BlobEviction[]): string | undefined {
  if (!planned.length) return undefined;
  for (const entry of planned) rmSync(entry.path);
  const dir = openSync(join(planned[0]!.path, ".."), "r");
  try { fsyncSync(dir); } finally { closeSync(dir); }
  return `Removed ${planned.length} superseded blob(s) from aggregate storage.`;
}
