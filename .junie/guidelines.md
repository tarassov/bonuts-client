Bonuts Client Guidelines

Purpose
- Give new contributors a fast, practical overview of how this React + TypeScript + Vite app is organized and how to work effectively.

Tech stack
- Build/tooling: Vite, TypeScript, Vitest, ESLint, Prettier, Husky/Lint-Staged
- UI: React 18, MUI (@mui/material, icons, x-date-pickers)
- State/data: Redux Toolkit, RTK Query (OpenAPI codegen), react-hook-form, i18next

Project layout (keep it consistent)
The project follows Feature-Sliced Design (FSD) methodology for better organization and scalability:

- src/shared: Cross-cutting utilities, types, auth model, hooks, constants. Must be framework-agnostic where possible.
- src/entities: Domain entities and domain-specific UI around them (e.g., donut). Keep logic close to entity.
- src/features: Business-logic focused modules that implement specific application features. Each feature can contain its own components, hooks, and utils.
- src/widgets: Complex, composable UI blocks that combine multiple components and can include business logic. Used for larger, self-contained features.
- src/pages: Page-level components that compose widgets and features.
- src/app: Application-level setup (providers, router, etc.).
- src/themes: Theming, MUI theme helpers, context.

Note: All new components should be placed following FSD structure in appropriate layers (shared/entities/features/widgets/pages). Avoid creating components directly in src/components.

Environment & configuration
- Copy .env.local.example to .env.local and fill in values.
- Common vars:
  - VITE_API_URL, VITE_API_LOCAL_URL, VITE_USE_LOCAL_HOST
- Modes: default (.env), .env.staging, .env.production. Use yarn build-staging for staging.

How to run
- Install: yarn install
- Dev: yarn start or yarn dev → http://localhost:3002
- Build: yarn build (prod), yarn build-staging (staging)
- Preview built app: yarn serve

Testing
- Watch mode: yarn test
- Single run (CI-friendly): yarn test:withoutWatch
- Coverage: vitest uses jsdom; coverage reports configured (text/json/html). To enforce locally, run with vitest flags if needed.
- Test location: Follow colocated tests near code or under __tests__ next to features. Name with .test.ts(x).

API code generation
- OpenAPI → RTK Query codegen: yarn generate-api (uses openapi-config.ts)
- After codegen, check-in generated types and API slices if repo policy allows; otherwise regenerate in CI.

Linting & formatting
- Lint: yarn lint (TypeScript + ESLint). No warnings allowed (max-warnings=0).
- Fix: yarn lint:fix
- Format check: yarn prettier
- Format write: yarn prettier:fix
- IDE: Enable Prettier on save. Keep imports sorted consistently (eslint-plugin-simple-import-sort is configured).

Coding standards
- TypeScript first: No implicit any. Prefer explicit return types for public functions.
- Components: Functional components with hooks. Keep components small and focused.
- State management: Prefer RTK slices/RTK Query for server state. Avoid duplicating server state in Redux.
- Forms: Use react-hook-form and validation with yup where applicable.
- Styling: Use MUI + @emotion styled. Keep theme-aware styles in themes/helper.ts or via MUI theme.
- File naming: kebab-case for files, PascalCase for React components, camelCase for variables/functions, UPPER_SNAKE_CASE for constants.
- Exports: Use index.ts barrels per folder for public surface; avoid giant barrels that cause circular deps.
- Imports: Use path aliases as configured via vite-tsconfig-paths; prefer absolute imports from src root over long relative chains.
- i18n: Wrap user-visible strings with i18next; avoid hard-coded text.

Git & PR workflow
- Branches: feature/…, fix/…, chore/…
- Commits: Conventional style is preferred (feat:, fix:, chore:, refactor:, test:, docs:). Keep messages imperative and scoped.
- PRs: Keep small and focused;  ensure lint/tests pass.

Accessibility & UX
- Use aria- attributes and semantic elements. Ensure keyboard navigation.
- Keep interactive hit areas adequate (MUI defaults are good).

Performance
- Prefer memoization (React.memo, useMemo/useCallback) only for measured bottlenecks.
- Use @tanstack/react-virtual for large lists; RTK Query caching for server data.

Security
- Never commit secrets. All secrets must be injected via env.
- Validate and sanitize user input where applicable; trust server-side validation too.

Release & deploy
- Predeploy: yarn build
- Deploy target: GitHub Pages via yarn deploy (dist folder). Ensure correct homepage in package.json.

When adding new code
- Pick the right layer (entities/pages/shared/features/widgets).
- Add/extend tests. Keep coverage meaningful around business logic.
- Run: yarn lint && yarn prettier && yarn test:withoutWatch before PR.

Keep this doc short and up to date. If something becomes outdated, update here and in README.md.
