# Changelog

[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) + [SemVer](https://semver.org/).

## [0.2.0] - 2026-05-17

### Added

- 子命令 `uninstall`: 删除当前安装的二进制 (与 `update` 对称, 仅编译后二进制可用)

## [0.1.0] - 2026-05-17

### Added

- 子命令 `help` / `version` / `update`
- macOS x64 + arm64 双架构编译
- tag 触发 Actions 自动发布 (含 SHA256 checksums)
- `install.sh` 一键安装

[0.2.0]: https://github.com/yigegongjiang/cli-template/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/yigegongjiang/cli-template/releases/tag/v0.1.0
