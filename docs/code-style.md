# Code Style

Frontend code-style rules are maintained as Claude Code skills in `.claude/skills/`, so they load only when relevant instead of sitting in every session's context.

| Topic | Skill |
|---|---|
| Feature-Sliced Design, layers, imports, file naming | `.claude/skills/bonuts-fsd/SKILL.md` |
| CSS Modules / `styled()` / `sx`, design tokens, style review | `.claude/skills/bonuts-styling/SKILL.md` |
| TypeScript, generated API, RTK Query cache tags | `.claude/skills/bonuts-typescript/SKILL.md` |
| Localization | `.claude/skills/bonuts-i18n/SKILL.md` |
| Storybook conventions | `.claude/skills/bonuts-storybook/SKILL.md` |
| Vitest and Cypress conventions | `.claude/skills/bonuts-testing/SKILL.md` |
| Scripts, env, Docker, build, deploy | `.claude/skills/bonuts-dev-runbook/SKILL.md` |

Readability rules, product context, and task framing live in [AGENTS.md](../AGENTS.md).

Product-agnostic visual foundations (color roles, spacing scale, surfaces, mailer notes) stay in [base-design-principles.md](base-design-principles.md).

When a rule changes, update the skill file — it is the source of truth. Do not re-document rules here.
