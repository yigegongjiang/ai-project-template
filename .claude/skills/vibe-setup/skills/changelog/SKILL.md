---
description: "Create or update CHANGELOG.md + CHANGELOG.dev.md pair for AI-only (Vibe Coding) project. Use when initializing, resetting, or modifying project changelogs."
allowed-tools: Bash Read Write Edit
---

# 生成 / 更新 CHANGELOG.md + CHANGELOG.dev.md

生成或更新用户向 + 开发者向两份 changelog 文件。

## 前置门禁（MUST）

验证 AGENTS.md 已作为 system prompt 在当前会话生效。

判定方式：检查你的 project instructions（会话启动时从 CLAUDE.md 自动加载）中是否包含 AGENTS.md 的核心约束——特征关键词：「当前 project 是 AI Only 工程」+「文档编写规范」+「工作模式」。

- **已生效**（project instructions 中有上述内容）→ 继续执行
- **未生效** → **停止执行**，输出：「AGENTS.md 未作为 system prompt 生效。请先执行 `/vibe-setup:agents`，然后**重启 Claude Code 会话**后再运行本 skill。」

> 磁盘上存在 AGENTS.md ≠ 已加载。CLAUDE.md 仅在会话启动时加载；本会话内创建/修改的 AGENTS.md 必须重启后才生效。

## 用户上下文

> $ARGUMENTS

用户调用时附带的补充描述（如版本号、变更要点等）。与工程自动探测并用，冲突时用户描述优先。无内容则忽略本段。

## 执行步骤

1. **探测工程上下文** — 读取包管理文件获取项目 repo URL（用于版本比较链接）；读取 git log 获取当前版本（如有 tag）；读取已有 CHANGELOG.md / CHANGELOG.dev.md（若存在）；检测非标准 changelog 类文件（如 `CHANGELOG` / `ChangeLog` / `CHANGES.md` / `HISTORY.md` / `CHANGELOG.txt` 等）
2. **生成或更新 CHANGELOG.md** — 不存在 → 按骨架新建；已存在但不符合骨架（缺 When Editing 块 / 不遵循 Keep a Changelog 格式 / 含技术细节等违规内容）→ 按骨架格式重新生成，已有版本条目迁入骨架格式；已存在且符合 → 按用户参数施加变更，无参数则跳过
3. **生成或更新 CHANGELOG.dev.md** — 不存在 → 按骨架新建；已存在但不符合骨架 → 按骨架格式重新生成，已有版本条目迁入骨架格式；已存在且符合 → 按用户参数施加变更，无参数则跳过

## CHANGELOG.md 骨架

````markdown
```When Editing
本文档作用: 面向使用者的发版记录; 只写用户感受得到的变化, MUST NOT 写技术细节 (→ CHANGELOG.dev.md)
遵循 AGENTS.md 文档编写规范
- 写: 新功能 / 行为修复 / 体验 / 安全 / 命令迁移
- MUST NOT 写: 文件路径 / 函数名 / 组件名 / 依赖包名 / 重构细节
- 单条 ≤ 2 行, 单版本 ≤ 5 条; 段落: Added / Changed / Fixed / Removed / Security
- 无用户可感知变化 → 占位: `跟随版本同步发布`
```

# Changelog

[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) + [SemVer](https://semver.org/).

## [_X.Y.Z_] - _YYYY-MM-DD_

### Added

- _用户感知得到的新增_

[_X.Y.Z_]: https://github.com/_owner_/_repo_/releases/tag/v_X.Y.Z_
````

## CHANGELOG.dev.md 骨架

````markdown
```When Editing
本文档作用: 面向开发者的发版记录; CHANGELOG.md 的超集, 1:1 镜像 + 技术变更子项
遵循 AGENTS.md 文档编写规范
- 每条主项 = CHANGELOG.md 对应条目 (原文), 下方缩进子项承载技术变更
- 子项 MAY 写路径 / 函数 / 机制; ≤ 1 行
```

# Changelog (developer, follow [CHANGELOG.md](./CHANGELOG.md))

## [_X.Y.Z_] - _YYYY-MM-DD_

### Added

- _用户向描述_
  - _技术变更子项_

[_X.Y.Z_]: https://github.com/_owner_/_repo_/releases/tag/v_X.Y.Z_
````

## 适配规则

- 版本号 → 从包管理文件或最新 git tag 提取；全新项目用 `0.1.0`
- repo URL → 从包管理文件的 repository 字段提取；无则用 `_owner_/_repo_` 占位
- 已有 changelog 且遵循 Keep a Changelog 格式（`## [version] - date` 分版块）→ 仅补充 When Editing 约束块，MUST NOT 覆盖已有条目
- 用户参数含明确修改指令 → 按指令更新已有条目，覆盖上条跳过规则
- 日期 → 使用当天日期
- 工程存在任何非 `CHANGELOG.md` / `CHANGELOG.dev.md` 的 changelog 类文件（如 `CHANGELOG` / `ChangeLog` / `CHANGES.md` / `HISTORY.md` / `CHANGELOG.txt` 等）→ 合并其版本条目入 CHANGELOG.md（用户向）+ CHANGELOG.dev.md（技术向），删除原文件；CHANGELOG.md + CHANGELOG.dev.md 是唯一 changelog 文件。**即使主文件跳过生成，本条仍 MUST 执行**
- 工程存在双语结构（`CHANGELOG.zh.md` / `CHANGELOG.dev.zh.md` 与对应主文件并存）→ 合并 `.zh.md` 独有事实入主文件，删除 `.zh.md` 文件。**即使主文件跳过生成，本条仍 MUST 执行**
