# ai-project-template

Bun single-file executable CLI template (macOS only). Push a tag → Actions auto-builds + publishes a Release; `install.sh` for one-shot install / `update` subcommand for self-update.

## Install

```bash
curl -fsSL https://raw.githubusercontent.com/yigegongjiang/ai-project-template/main/install.sh | bash
```

Installs to `$HOME/.local/bin`.

## Usage

Command name = `package.json#name` = repo basename → `ai-project-template` (rename both to rebrand).

```bash
ai-project-template <subcommand>
```

<!-- prettier-ignore -->
| Command | Alias | Description |
|---|---|---|
| `help` | `-h` / `--help` | Usage |
| `version` | `-v` / `--version` | Version |
| `update` | `upgrade` | Self-update (compiled binary only) |
| `uninstall` | — | Uninstall (compiled binary only) |
