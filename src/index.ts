import { createHash } from "node:crypto";
import { chmod, mkdir, rename, unlink, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";

import pkg from "../package.json" with { type: "json" };

const NAME = pkg.name;
const VERSION = pkg.version;
const REPO = pkg.repository;

const USAGE = `Usage: ${NAME} [command]

Commands:
  (none)                  Print "Hello, world!"
  help, --help, -h        Show this help message
  version, --version, -v  Show version information
  update, upgrade         Download the latest release and replace this binary
  uninstall               Remove this binary from disk`;

function assertInstalled(action: string): void {
  if (basename(process.execPath) !== NAME) {
    throw new Error(`refusing to ${action}: not the installed binary`);
  }
}

function assetName(): string {
  if (process.platform !== "darwin") throw new Error(`unsupported OS: ${process.platform}`);
  const a = process.arch;
  if (a !== "x64" && a !== "arm64") throw new Error(`unsupported arch: ${a}`);
  return `${NAME}-darwin-${a}`;
}

async function fetchBytes(url: string): Promise<Uint8Array> {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status} ${res.statusText}`);
  return new Uint8Array(await res.arrayBuffer());
}

async function update(): Promise<number> {
  assertInstalled("self-update");

  const asset = assetName();
  const base = `https://github.com/${REPO}/releases/latest/download`;
  const dest = process.execPath;

  console.log(`==> Updating ${NAME} (current: ${VERSION})`);
  const bytes = await fetchBytes(`${base}/${asset}`);

  // Best-effort checksum.
  try {
    const res = await fetch(`${base}/checksums.txt`, { redirect: "follow" });
    if (res.ok) {
      const line = (await res.text()).split(/\r?\n/).find((l) => l.trim().endsWith(` ${asset}`));
      if (line) {
        const expected = line.trim().split(/\s+/)[0]!.toLowerCase();
        const actual = createHash("sha256").update(bytes).digest("hex");
        if (expected !== actual) {
          console.error(`error: checksum mismatch`);
          return 1;
        }
      }
    }
  } catch {}

  // Atomic replace via tmp on the same filesystem.
  await mkdir(dirname(dest), { recursive: true });
  const tmp = join(dirname(dest), `.${NAME}.update.${process.pid}`);
  await writeFile(tmp, bytes);
  await chmod(tmp, 0o755);
  try {
    await rename(tmp, dest);
  } catch (err) {
    await unlink(tmp).catch(() => {});
    throw err;
  }

  console.log(`==> Updated: ${dest}`);
  return 0;
}

async function uninstall(): Promise<number> {
  assertInstalled("uninstall");
  await unlink(process.execPath);
  console.log(`==> Removed: ${process.execPath}`);
  return 0;
}

async function main(args: readonly string[]): Promise<number> {
  const cmd = args[0];
  switch (cmd) {
    case undefined:
      console.log("Hello, world!");
      return 0;
    case "help":
    case "--help":
    case "-h":
      console.log(USAGE);
      return 0;
    case "version":
    case "--version":
    case "-v":
      console.log(`${NAME} ${VERSION}`);
      return 0;
    case "update":
    case "upgrade":
      try {
        return await update();
      } catch (err) {
        console.error(`error: update failed: ${err instanceof Error ? err.message : String(err)}`);
        return 1;
      }
    case "uninstall":
      try {
        return await uninstall();
      } catch (err) {
        console.error(`error: uninstall failed: ${err instanceof Error ? err.message : String(err)}`);
        return 1;
      }
    default:
      console.error(`error: unknown command "${cmd}"\n`);
      console.error(USAGE);
      return 1;
  }
}

process.exit(await main(Bun.argv.slice(2)));
