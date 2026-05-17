# cli-template

Bun 单文件可执行 CLI 模板 (仅 macOS). 改完代码 → 在 `CHANGELOG.md` 顶部新增版本段 → 按 [deploy.md](./deploy.md) 发布.

非必要，不用在反问用户，直接勇敢的自行做决策和执行，比如 deploy、技术抉择等。

`package.json#version` 经 `build.ts` 注入二进制, 必须与 tag 一致 (Actions 会做一致性校验, 不一致直接 fail).

## 派生新项目必改字段

约定: `package.json#name` 必须等于 GitHub repo 名 (`install.sh` 据此推导 `BIN_NAME`, build 产物名也依赖它).

- `package.json`: `name` (= repo 名)、`version` (重置为 `0.1.0`)、`repository` (`<owner>/<repo>`)、`description`
- `install.sh`: `REPO` 默认值改成 `<owner>/<repo>` (`BIN_NAME` 自动从 REPO 派生, 通常不用动)
- `README.md`: 顶部安装命令里的 `<owner>/<repo>` 路径
- `CHANGELOG.md`: 重置为初版条目, 底部对比链接 host 改成新 repo

## 边界

- 仅 macOS (x64 + arm64). 其它平台 `install.sh` 与 `update` 子命令都会主动拒绝.
- `update` 子命令只在编译后的二进制可用. `bun run start update` 会被守卫拦截 (避免覆盖系统 bun).
- 自更新与 `install.sh` 默认拉 GitHub Release 的 `latest`; checksum 校验是 best-effort (`checksums.txt` 缺失则跳过).
- 不提交 `dist/`、`node_modules/`、`*.bun-build` (已在 `.gitignore`).
