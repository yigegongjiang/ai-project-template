# Changelog

[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) + [SemVer](https://semver.org/).

## [0.3.1] - 2026-06-10

### Changed

- `update` / `upgrade` 完成后打印更新前后的版本号

## [0.3.0] - 2026-06-10

### Removed

- `install.sh` 不再支持 `REPO` / `VERSION` / `INSTALL_DIR` / `BIN_NAME` 环境变量覆写
- `update` 子命令的下载进度条

### Changed

- 砍掉 `BUILD_NAME` / `BUILD_VERSION` / `BUILD_REPO` 编译期 define 注入, 改为运行时直接读 `package.json`
- 构建产物不再生成外部 sourcemap

## [0.2.4] - 2026-06-08

### Changed

- README 精简: 补可执行命令名说明, 移除 Development/Release 章节
- 构建清理 dist/ 多余 sourcemap (`*.js.map`), 运行时堆栈仍内嵌二进制

## [0.2.3] - 2026-06-02

### Changed

- 跟随版本同步发布

## [0.2.2] - 2026-06-02

### Changed

- 跟随版本同步发布

## [0.2.1] - 2026-05-17

### Changed

- `update` 下载时显示进度条
- `update` 完成后打印更新前后的版本

## [0.2.0] - 2026-05-17

### Added

- 新增 `uninstall` 子命令: 卸载已安装的二进制 (仅编译后二进制可用)

## [0.1.0] - 2026-05-17

### Added

- 子命令 `help` / `version` / `update`
- 支持 macOS x64 / arm64
- `install.sh` 一键安装
- 自动发布, 产物附 SHA256 校验和

[0.3.1]: https://github.com/yigegongjiang/cli-template/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/yigegongjiang/cli-template/compare/v0.2.4...v0.3.0
[0.2.4]: https://github.com/yigegongjiang/cli-template/compare/v0.2.3...v0.2.4
[0.2.3]: https://github.com/yigegongjiang/cli-template/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/yigegongjiang/cli-template/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/yigegongjiang/cli-template/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/yigegongjiang/cli-template/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/yigegongjiang/cli-template/releases/tag/v0.1.0
