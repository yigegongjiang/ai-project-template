# cli-template

Bun 单文件可执行 CLI 模板 (仅 macOS)。打 tag → GitHub Actions 自动构建并发布 release；用户用 `install.sh` 一键安装，或通过内置 `update` 子命令自更新。

## 安装

```bash
curl -fsSL https://raw.githubusercontent.com/yigegongjiang/cli-template/main/install.sh | bash
```

默认装到 `$HOME/.local/bin`。可用 `VERSION` / `INSTALL_DIR` / `REPO` 覆写。

## 自更新

```bash
cli-template update    # 与 upgrade 等价
```

## 开发

```bash
bun install
bun run start          # 源码运行
bun run build          # 编译两个 macOS 架构 → dist/
bun run typecheck
```

子命令：`help` / `-h` / `--help`，`version` / `-v` / `--version`，`update` / `upgrade`，`uninstall`。

## 发布

推 `v*` tag 即触发 `.github/workflows/release.yml`，构建 + 生成 `checksums.txt` + 创建 Release。

```bash
git tag v0.1.0
git push origin v0.1.0
```
