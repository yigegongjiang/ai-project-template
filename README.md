# cli-template

Bun single-file executable CLI template (macOS only). Push a tag → Actions auto-builds + publishes a Release; `install.sh` for one-shot install / `update` subcommand for self-update.

## Install

```bash
curl -fsSL https://raw.githubusercontent.com/yigegongjiang/cli-template/main/install.sh | bash
```

Installs to `$HOME/.local/bin` by default. Override with `VERSION` / `INSTALL_DIR` / `REPO`.

## Subcommands

<!-- prettier-ignore -->
| Command | Alias | Description |
|---|---|---|
| `help` | `-h` / `--help` | Usage |
| `version` | `-v` / `--version` | Version |
| `update` | `upgrade` | Self-update (compiled binary only) |
| `uninstall` | — | Uninstall (compiled binary only) |

## Development

```bash
bun install
bun run start          # run from source
bun run build          # compile x64 + arm64 → dist/
bun run typecheck
```

## Release

Pushing a `v*` tag triggers `.github/workflows/release.yml`. Steps → [deploy.md](./deploy.md).
