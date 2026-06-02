# cli-template

Bun 单文件可执行 CLI 模板 (仅 macOS). 打 tag → Actions 自动构建 + 发 Release; `install.sh` 一键装 / `update` 子命令自更新.

## 安装

```bash
curl -fsSL https://raw.githubusercontent.com/yigegongjiang/cli-template/main/install.sh | bash
```

默认装到 `$HOME/.local/bin`. 可用 `VERSION` / `INSTALL_DIR` / `REPO` 覆写.

## 子命令

<!-- prettier-ignore -->
| 命令 | 别名 | 说明 |
|---|---|---|
| `help` | `-h` / `--help` | 用法 |
| `version` | `-v` / `--version` | 版本 |
| `update` | `upgrade` | 自更新 (仅编译后二进制) |
| `uninstall` | — | 卸载 (仅编译后二进制) |

## 开发

```bash
bun install
bun run start          # 源码运行
bun run build          # 编译 x64 + arm64 → dist/
bun run typecheck
```

## 发布

推 `v*` tag 触发 `.github/workflows/release.yml`. 步骤 → [deploy.md](./deploy.md).
