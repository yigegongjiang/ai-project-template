import { readdir, unlink } from "node:fs/promises";

import pkg from "./package.json" with { type: "json" };

const TARGETS = ["bun-darwin-x64", "bun-darwin-arm64"] as const;

async function cleanLeftovers(): Promise<void> {
  // `bun build --compile` leaves `.<hash>-<index>.bun-build` intermediates in cwd, plus
  // a redundant `*.js.map` in dist/ — the runtime sourcemap is embedded into the binary,
  // so the standalone .map is never shipped (install.sh only fetches the executable).
  const root = await readdir(".");
  const dist = await readdir("./dist").catch(() => [] as string[]);
  await Promise.all([
    ...root
      .filter((n) => n.endsWith(".bun-build"))
      .map((n) => unlink(n).catch(() => {})),
    ...dist
      .filter((n) => n.endsWith(".map"))
      .map((n) => unlink(`./dist/${n}`).catch(() => {})),
  ]);
}

try {
  for (const target of TARGETS) {
    const suffix = target.replace(/^bun-/, "");
    const outfile = `./dist/${pkg.name}-${suffix}`;
    const result = await Bun.build({
      entrypoints: ["./src/index.ts"],
      minify: true,
      sourcemap: "linked",
      define: {
        BUILD_NAME: JSON.stringify(pkg.name),
        BUILD_VERSION: JSON.stringify(pkg.version),
        BUILD_REPO: JSON.stringify(pkg.repository ?? ""),
      },
      compile: { outfile, target },
    });
    if (!result.success) {
      for (const log of result.logs) console.error(log);
      throw new Error(`build failed for ${target}`);
    }
    console.log(`built: ${outfile}`);
  }
} finally {
  await cleanLeftovers();
}
