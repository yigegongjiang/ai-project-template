---
description: "Initialize complete AI-only (Vibe Coding) project config — generates AGENTS.md, CLAUDE.md, README.md, workflow.md, CHANGELOG.md, CHANGELOG.dev.md. May require session restart between AGENTS.md creation and remaining docs. Use when setting up a new project for full AI-autonomous development."
disable-model-invocation: true
allowed-tools: Bash Read Write Edit
---

# 一键初始化 Vibe Coding 工程

依次生成全套 AI-only 工程文档。AGENTS.md 必须作为 system prompt 生效后才能约束其他文档的生成，因此初始化可能需要跨两个会话完成。

## 用户上下文

> $ARGUMENTS

用户调用时附带的补充描述（如项目类型、技术栈、特殊约束等）。作为全局上下文影响所有文件的生成决策。无内容则忽略本段。

## 执行步骤

### Phase 1: 检查 AGENTS.md 是否已作为 system prompt 生效

判定方式：检查你的 project instructions（会话启动时从 CLAUDE.md 自动加载）中是否包含 AGENTS.md 的核心约束——特征关键词：「当前 project 是 AI Only 工程」+「文档编写规范」+「工作模式」。

> 磁盘上存在 AGENTS.md ≠ 已加载。CLAUDE.md 仅在会话启动时加载；本会话内创建/修改的 AGENTS.md 必须重启后才生效。

- **已生效** → 跳到 Phase 3
- **未生效** → 进入 Phase 2

### Phase 2: 创建 AGENTS.md（需重启）

> Phase 1 已确认 AGENTS.md 未作为 system prompt 生效。无论磁盘上是否已有 AGENTS.md，本阶段结束后 MUST 要求重启（agents skill 的「已有且符合→不重启」不适用于此——该规则仅针对独立调用场景）。

1. Read `.claude/skills/vibe-setup/skills/agents/SKILL.md`，仅按其**骨架**生成 AGENTS.md
2. 若存在 `AGENTS.zh.md` → 合并其独有事实入 AGENTS.md，删除 `AGENTS.zh.md`；若存在 `CLAUDE.zh.md` 一并删除
3. 若存在独立 LLM 文本规范文件（`llm-doc-style.md` / `llm-doc-style.zh.md` 等）→ 删除；AGENTS.md「文档编写规范」段是唯一信源
4. `ln -sf AGENTS.md CLAUDE.md`
5. **停止执行**，输出：

> AGENTS.md + CLAUDE.md 已创建。
> 请**重启 Claude Code / Codex 会话**，使 AGENTS.md 作为 system prompt 生效。
> 重启后再次执行 `/vibe-setup:init` 完成剩余文档生成。

### Phase 3: 生成剩余文档

前提：AGENTS.md 已通过 Phase 1 校验（= 已作为 system prompt 加载，约束已生效）。

1. 读取工程上下文：根目录文件 + 包管理文件 + CI 配置 + 部署配置
2. 依次 Read 以下 3 个 SKILL.md，提取骨架和适配规则：
   - `.claude/skills/vibe-setup/skills/readme/SKILL.md`
   - `.claude/skills/vibe-setup/skills/workflow/SKILL.md`
   - `.claude/skills/vibe-setup/skills/changelog/SKILL.md`
3. 按顺序生成（已存在且符合规范 → 跳过）：
   - **README.md** — 按 readme/SKILL.md
   - **workflow.md** — 按 workflow/SKILL.md
   - **CHANGELOG.md** + **CHANGELOG.dev.md** — 按 changelog/SKILL.md

### Phase 4: 验证

1. 确认必要文件已生成：AGENTS.md / CLAUDE.md(symlink) / README.md / workflow.md / CHANGELOG.md / CHANGELOG.dev.md
2. 确认 CLAUDE.md 是指向 AGENTS.md 的 symlink
3. 确认 AGENTS.md 中的路由链接目标文件均存在
4. 确认 workflow.md 命令与工程实际工具链一致
5. 确认无残留双语文件（`*.zh.md`）、独立部署文档（`deploy.md` / `DEPLOY.md` / `deployment.md` / `release.md` / `RELEASE.md`）、非标准 changelog 类文件（`CHANGELOG.md` + `CHANGELOG.dev.md` 以外的任何 changelog 类文件）和独立 LLM 文本规范文件（`llm-doc-style.md` 等）

## 注意事项

- 已存在的文件：读取后判断是否符合对应 skill 骨架规范；符合 → 跳过；不符合 → 按骨架重新生成（骨架 = 唯一标准，不符合即为不合规）
- 用户参数含明确修改指令 → 按指令更新对应文件，覆盖上条跳过规则
- 骨架中的 `_placeholder_` 全部用工程实际信息替换，MUST NOT 留空占位
