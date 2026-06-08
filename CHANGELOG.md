# Changelog

[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) + [SemVer](https://semver.org/).

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

[0.2.4]: https://github.com/yigegongjiang/cli-template/compare/v0.2.3...v0.2.4
[0.2.3]: https://github.com/yigegongjiang/cli-template/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/yigegongjiang/cli-template/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/yigegongjiang/cli-template/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/yigegongjiang/cli-template/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/yigegongjiang/cli-template/releases/tag/v0.1.0
