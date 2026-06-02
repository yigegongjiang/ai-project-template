# md 编写指南

高密度原则; 所有下述 md MUST 符合本指南.

## 分层 (单一信源, 互引不复述)

<!-- prettier-ignore -->
| 文件 | 内容 |
|---|---|
| `AGENTS.md` | LLM 约束 / 优先级 / 硬规则 |
| `README.md` | 工程总览 / 拓扑 / 命令 |
| `deploy.md` | 发布流程 |
| `setup.md` | 一次性 Secrets / 资源 |
| `CHANGELOG.md` | 面向使用者的发版记录 |

跨文档用 `[xxx.md](./xxx.md)` 引用, 不复述事实.

## 通用风格

- 能一行不写两行, 能列表不写段落
- 短句; 用 `->` `/` `+` 替连接词
- 强度词: MUST / MUST NOT / SHOULD
- 短并列项 (≤12 中文/单元格) 用表格
- 长并列点用列表
- CommonMark/GFM

## AGENTS.md

- 只写 LLM 约束, MUST NOT 写工程说明
- 首段一行角色定位 + link 到 README / deploy
- 必含: 优先级 / 工作模式 (默认含闭环 + 豁免条件) / 跨项目硬约束 / 文件约定
- 子项目 `AGENTS.md` link 回根, 不复述跨项目规则

## README.md

- 首段一行价值主张, MUST NOT 带 LLM 提示
- 子项目 / 命令 / 端点用表格
- 系统拓扑用 ASCII 图, MUST NOT mermaid
- 命令块 fenced code, 注释贴 `#` 同行
- 末尾 link deploy / setup

## deploy.md

- 顶部 TL;DR ≤ 4 行
- 步骤编号清晰 (写版本 -> 本地验证 -> tag + push -> 等 workflow)
- 一次性前置抽到 `setup.md`, 此处仅 link
- 风险点 / 不可逆操作用 `>` 引用块
- 高危操作 (amend / force push) MUST 标禁用条件

## CHANGELOG (Keep a Changelog + SemVer)

- **面向使用者**, 写他们感受得到的事
- 写: 新功能 / 行为修复 / 体验 / 安全 / 命令迁移
- MUST NOT 写: 文件路径 / 函数名 / CSS class / 重构细节 / "我改了哪行"
- 单条 ≤ 2 行, 单版本 ≤ 5 条
- 段落: Added / Changed / Fixed / Removed / Security
- lockstep 占位发版: `跟随版本同步发布`
- 中文行文; 命令 / 术语保留原文

## 反模式 (审稿时优先抓)

- 段落式描述 -> 拆列表
- 同一事实在两个文件各写一遍 -> 留一处 + link
- CHANGELOG 写"改了哪个文件 / 哪个函数" -> 改写"用户看到什么变化"
- AGENTS 塞拓扑 / 命令 / 安装说明 -> 抽到 README / setup
- 表格单元格塞长句 -> 改列表
