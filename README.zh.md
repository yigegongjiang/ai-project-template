# cli-template

Bun 单文件可执行 CLI 模板 (仅 macOS). 打 tag → Actions 自动构建 + 发 Release; `install.sh` 一键装 / `update` 子命令自更新.

## 安装

```bash
curl -fsSL https://raw.githubusercontent.com/yigegongjiang/cli-template/main/install.sh | bash
```

装到 `$HOME/.local/bin`.

## 用法

命令名 = `package.json#name` = repo basename → `cli-template` (改名时两处一起改).

```bash
cli-template <子命令>
```

<!-- prettier-ignore -->
| 命令 | 别名 | 说明 |
|---|---|---|
| `help` | `-h` / `--help` | 用法 |
| `version` | `-v` / `--version` | 版本 |
| `update` | `upgrade` | 自更新 (仅编译后二进制) |
| `uninstall` | — | 卸载 (仅编译后二进制) |
