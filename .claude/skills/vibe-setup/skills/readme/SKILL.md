---
description: "Create or update README.md for AI-only (Vibe Coding) project. Generates a lean, AI-facing project overview without dev/build instructions. Use when initializing, resetting, or modifying project README."
allowed-tools: Bash Read Write Edit
---

# 生成 / 更新 README.md

读取目标工程上下文，生成或更新符合 Vibe Coding 规范的 README.md。

## 前置门禁（MUST）

验证 AGENTS.md 已作为 system prompt 在当前会话生效。

判定方式：检查你的 project instructions（会话启动时从 CLAUDE.md 自动加载）中是否包含 AGENTS.md 的核心约束——特征关键词：「当前 project 是 AI Only 工程」+「文档编写规范」+「工作模式」。

- **已生效**（project instructions 中有上述内容）→ 继续执行
- **未生效** → **停止执行**，输出：「AGENTS.md 未作为 system prompt 生效。请先执行 `/vibe-setup:agents`，然后**重启 Claude Code 会话**后再运行本 skill。」

> 磁盘上存在 AGENTS.md ≠ 已加载。CLAUDE.md 仅在会话启动时加载；本会话内创建/修改的 AGENTS.md 必须重启后才生效。

## 用户上下文

> $ARGUMENTS

用户调用时附带的补充描述（如项目类型、章节取舍等）。探测阶段与工程文件并用，冲突时用户描述优先。无内容则忽略本段。

## 执行步骤

1. **探测工程上下文** — 读取根目录文件 + 包管理文件（package.json / Cargo.toml / pyproject.toml / go.mod / ...），识别项目名、描述、技术栈、目录结构；读取已有 README.md（若存在）
2. **确定章节** — 按下方骨架，根据项目复杂度决定保留 / 删除可选章节
3. **生成或更新 README.md** — 不存在 → 按骨架新建，替换 `_placeholder_`；已存在但不符合骨架（缺 When Editing 块 / 结构不匹配 / 含「开发」段等违规内容）→ 按骨架重新生成，用探测事实填充；已存在且符合 → 按用户参数施加变更，无参数则跳过

## README.md 骨架

````markdown
```When Editing
本文档作用: 工程总览 (价值主张 / 使用 / 架构 / 结构); MUST NOT 写发布流程 (→ workflow.md) / LLM 约束 (→ AGENTS.md)
遵循 AGENTS.md 文档编写规范
- 章节按需增删, 只留项目真有的; 首行一行价值主张, MUST NOT 带 LLM 提示
- 短并列项用表格; 可执行步骤 fenced + `#` 注释同行
- NEVER 写「开发」段 (VibeCoding 不向人类解释 dev 命令)
```

# `_project-name_`

_(1 句话) 当前工程是什么 + 核心能力._

## 使用

_(1-2 句话) 精简、概要的说明如何使用当前工程的产物._

## 架构

_(1-2 行) 精简、概要的说明当前工程使用的技术方案/技术栈._

## 项目结构

_(1-4 行) 精简、概要的说明当前工程的目录结构._
````

## 适配规则

- `_project-name_` → 从包管理文件或目录名提取
- 一句话描述 → 从包管理文件的 description 字段或项目文件推断
- 使用段 → CLI 写 install 方式，Web 写访问 URL，Library 写依赖引入；无产物可删
- 架构段 → 从技术栈文件自动推断（runtime + framework + infra）；极简项目可删整段
- 项目结构段 → 列核心目录，MUST NOT 列 node_modules / dist / build 等生成物；极简项目可删整段
- NEVER 添加「开发」段或任何 dev/build 命令说明
- 用户参数含明确修改指令 → 按指令更新已有内容，不跳过
- 工程存在双语结构（`README.zh.md` 与 `README.md` 并存）→ 合并 `.zh.md` 独有事实入 README.md，删除 `README.zh.md`。**即使主文件跳过生成，本条仍 MUST 执行**
