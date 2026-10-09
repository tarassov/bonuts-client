---
name: bonuts-dev-runbook
description: How to run, check, build, and deploy the Bonuts client — yarn scripts, env vars and ports, Docker, Storybook, API codegen, lint/typecheck, and the GitHub Pages deploy. Use when asked to start the app, run checks or tests, build, regenerate the API, or deploy, and before suggesting any command from README (which is partly outdated).
---

# Bonuts Dev Runbook

React 18 + TypeScript + Vite + MUI. State: Redux Toolkit / RTK Query. Lint/format: **Biome** (not ESLint/Prettier — README and `.junie/guidelines.md` are stale on this). Tests: Vitest + Cypress. Hooks: Husky + lint-staged.

## Environment

- Copy `.env.local.example` → `.env.local`.
- Files: `.env` (default), `.env.local` (uncommitted overrides), `.env.staging`, `.env.production`.
- Key vars: `VITE_API_URL`, `VITE_API_LOCAL_URL`, `VITE_USE_LOCAL_HOST`.
- Never commit secrets; inject via env.

## Run

```bash
yarn install
yarn dev          # or yarn start — https://localhost:3002 (local HTTPS cert, browser warning is expected)
yarn dev:e2e      # http://localhost:4173, VITE_API_URL=/api/v1, mode e2e
yarn serve        # preview a production build
```

Docker:

```bash
docker compose up -d
docker compose logs -f client
docker compose down
```

First run installs deps into a Docker volume and can take several minutes.

## Check before PR

```bash
yarn lint          # typecheck + biome check src + fsd:check:working-tree
yarn lint:fix      # same, with biome --write
yarn typecheck     # tsc --noEmit
yarn biome         # biome check src --diagnostic-level=error
yarn biome:fix
yarn fsd:check:working-tree
yarn test:withoutWatch
```

`yarn lint` is the single gate — it covers typecheck, Biome, and FSD boundaries.

## Test

```bash
yarn test               # vitest watch
yarn test:withoutWatch  # vitest run
yarn cypress:run        # boots yarn dev:e2e on :4173, runs all specs, tears down
yarn cypress:run:login  # single spec
yarn cypress:open       # interactive; start `yarn dev:e2e` yourself first
```

## Storybook

```bash
yarn storybook          # http://localhost:6006
yarn build-storybook    # static output
```

Inside Docker: `docker compose exec client yarn storybook`. If port 6006 is not exposed on an older container, recreate it with `docker compose up -d --force-recreate`.

## API codegen

```bash
yarn generate-api   # @rtk-query/codegen-openapi with openapi-config.ts
```

Never hand-edit `src/services/api/bonuts-api.ts`.

## Build and deploy

```bash
yarn build           # tsc && vite build → dist
yarn build-staging   # vite build --mode staging
yarn deploy          # predeploy runs build, then gh-pages -d dist -t
```

Deploy target is GitHub Pages, `homepage` in `package.json` is `https://develop.bonuts.ru`, and `CNAME` is committed. Deploying publishes to a live site — confirm with the user before running `yarn deploy`.

## Git workflow

- Branches: `feature/…`, `fix/…`, `chore/…`. Default working branch is `develop`; PRs target `develop` (CI in `.github/workflows/node.js.yml` runs on `develop`). `master` is the release branch.
- Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`. Imperative and scoped.
- Keep PRs small and focused; `yarn lint` and tests must pass.
