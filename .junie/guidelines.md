# Bonuts Client Guidelines

Working rules for this repository live in two places:

- [AGENTS.md](../AGENTS.md) — product context, task framing, readability, safe-change behavior.
- `.claude/skills/` — technical conventions, loaded on demand:
  - `bonuts-fsd` — Feature-Sliced Design layers, imports, file naming
  - `bonuts-styling` — CSS Modules / `styled()` / `sx`, design tokens
  - `bonuts-typescript` — types, generated API, RTK Query cache tags
  - `bonuts-i18n` — localization
  - `bonuts-dev-runbook` — env, scripts, Docker, Storybook, build, deploy, git flow
  - `bonuts-storybook` — story conventions
  - `bonuts-testing` — Vitest and Cypress

Tech stack: Vite, TypeScript, React 18, MUI, Redux Toolkit + RTK Query (OpenAPI codegen), react-hook-form, i18next. Lint/format via **Biome**; Vitest for unit tests, Cypress for e2e; Husky + lint-staged on commit.

Before a PR: `yarn lint && yarn test:withoutWatch`.

Do not re-document rules in this file — update the relevant skill instead.
