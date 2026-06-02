# MD authoring guide

High-density principle; all md files below MUST follow this guide.

## Layering (single source of truth, cross-reference instead of restating)

<!-- prettier-ignore -->
| File | Content |
|---|---|
| `AGENTS.md` | LLM constraints / priorities / hard rules |
| `README.md` | Project overview / topology / commands |
| `deploy.md` | Release flow |
| `setup.md` | One-time secrets / resources |
| `CHANGELOG.md` | User-facing release notes |
| `CHANGELOG` | Developer-facing: mirror of `CHANGELOG.md` + per-entry technical detail |

Cross-reference with `[xxx.md](./xxx.md)`; do not restate facts.

## General style

- One line over two, a list over a paragraph
- Short sentences; use `->` `/` `+` instead of conjunctions
- Strength words: MUST / MUST NOT / SHOULD
- Short parallel items (≤6 words per cell) → table
- Long parallel points → list
- CommonMark/GFM

## AGENTS.md

- LLM constraints only; MUST NOT write project docs
- First paragraph: one-line role statement + links to README / deploy
- Must include: priorities / workflow (closed loop by default + exemption conditions) / cross-project hard constraints / file conventions
- Sub-project `AGENTS.md` links back to root, does not restate cross-project rules

## README.md

- First paragraph: one-line value proposition; MUST NOT carry LLM hints
- Sub-projects / commands / endpoints → table
- System topology → ASCII diagram; MUST NOT use mermaid
- Command blocks fenced; comments inline with `#`
- Link to deploy / setup at the end

## deploy.md

- TL;DR at the top, ≤ 4 lines
- Clearly numbered steps (write version -> verify locally -> tag + push -> wait for workflow)
- Extract one-time prerequisites into `setup.md`, link only here
- Risks / irreversible operations → `>` blockquote
- Dangerous operations (amend / force push) MUST mark their forbidden conditions

## CHANGELOG — two files (Keep a Changelog + SemVer)

`CHANGELOG.md` (user-facing) + `CHANGELOG` (developer-facing), kept in lockstep → [deploy.md](./deploy.md).

### CHANGELOG.md (user-facing)

- Write what they can perceive
- Write: new features / behavior fixes / experience / security / command migrations
- MUST NOT write: file paths / function names / CSS classes / refactor details / "which line I changed"
- ≤ 2 lines per entry, ≤ 5 entries per version
- Sections: Added / Changed / Fixed / Removed / Security
- Lockstep placeholder release: `released in sync with the version`
- English prose; keep commands / terms verbatim

### CHANGELOG (developer-facing)

- Superset of `CHANGELOG.md`: mirror every entry 1:1, append one indented sub-item carrying the technical change
- Sub-items MAY name paths / functions / mechanisms (inverse of the user-facing MUST NOT); ≤ 1 line, file/function/mechanism level
- Same language as `CHANGELOG.md`

## Anti-patterns (catch these first when reviewing)

- Paragraph-style description -> split into a list
- Same fact written twice in two files -> keep one + link
- CHANGELOG writing "which file / which function changed" -> rewrite as "what changed for the user"
- AGENTS stuffed with topology / commands / install instructions -> extract to README / setup
- Long sentence crammed into a table cell -> switch to a list
