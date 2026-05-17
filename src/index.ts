import { createHash } from "node:crypto";
import { chmod, mkdir, rename, unlink, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";

import pkg from "../package.json" with { type: "json" };

// `build.ts` injects BUILD_* via `--define` at compile time.
// In dev (`bun run start`), they are undeclared; `typeof` is safe and falls back to package.json.
declare const BUILD_NAME: string | undefined;
declare const BUILD_VERSION: string | undefined;
declare const BUILD_REPO: string | undefined;

const NAME = typeof BUILD_NAME === "string" ? BUILD_NAME : pkg.name;
const VERSION = typeof BUILD_VERSION === "string" ? BUILD_VERSION : pkg.version;
const REPO = typeof BUILD_REPO === "string" ? BUILD_REPO : (pkg.repository ?? "");

const USAGE = `Usage: ${NAME} [command]

Commands:
  (none)                  Print "Hello, world!"
  help, --help, -h        Show this help message
  version, --version, -v  Show version information
  update, upgrade         Download the latest release and replace this binary`;

function detectAsset(): string {
  if (process.platform !== "darwin") {
    throw new Error(`unsupported OS: ${process.platform} (only darwin is supported)`);
  }
  const a = process.arch;
  if (a !== "x64" && a !== "arm64") throw new Error(`unsupported arch: ${a}`);
  return `${NAME}-darwin-${a}`;
}

async function fetchOk(url: string): Promise<Response> {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status} ${res.statusText}`);
  return res;
}

async function update(): Promise<number> {
  const assetName = detectAsset();
  const base = `https://github.com/${REPO}/releases/latest/download`;
  const assetUrl = `${base}/${assetName}`;
  const checksumsUrl = `${base}/checksums.txt`;
  const dest = process.execPath;
  if (basename(dest) !== NAME) {
    throw new Error(
      `refusing to self-update: current executable is "${basename(dest)}", expected "${NAME}". ` +
        `self-update only works on the installed binary, not when running from source via bun.`,
    );
  }

  console.log(`==> Updating ${NAME}`);
  console.log(`    repo:   ${REPO}`);
  console.log(`    target: ${dest}`);
  console.log(`    before: ${NAME} ${VERSION}`);

  console.log(`==> Downloading ${assetUrl}`);
  const assetRes = await fetchOk(assetUrl);
  const assetBytes = new Uint8Array(await assetRes.arrayBuffer());

  // Verify checksum if checksums.txt exists for this release.
  try {
    const checksumsRes = await fetch(checksumsUrl, { redirect: "follow" });
    if (checksumsRes.ok) {
      const text = await checksumsRes.text();
      const line = text.split(/\r?\n/).find((l) => l.trim().endsWith(` ${assetName}`));
      if (line) {
        const expected = line.trim().split(/\s+/)[0]!.toLowerCase();
        const actual = createHash("sha256").update(assetBytes).digest("hex");
        if (expected !== actual) {
          console.error(`error: checksum mismatch (expected ${expected}, got ${actual})`);
          return 1;
        }
        console.log("==> Checksum OK");
      }
    }
  } catch {
    // Checksums are best-effort.
  }

  // Atomic replace via tmp on the same filesystem.
  await mkdir(dirname(dest), { recursive: true });
  const tmp = join(dirname(dest), `.${NAME}.update.${process.pid}`);
  await writeFile(tmp, assetBytes);
  await chmod(tmp, 0o755);
  try {
    await rename(tmp, dest);
  } catch (err: unknown) {
    await unlink(tmp).catch(() => {});
    throw err;
  }

  console.log(`==> Updated: ${dest}`);
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
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`error: update failed: ${msg}`);
        return 1;
      }
    default:
      console.error(`error: unknown command "${cmd}"\n`);
      console.error(USAGE);
      return 1;
  }
}

process.exit(await main(Bun.argv.slice(2)));
