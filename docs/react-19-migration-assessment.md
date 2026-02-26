# React 19 migration assessment

## Executive summary

A migration to stable React 19 is **possible**, but the current dependency graph includes several packages whose published peer dependency ranges are React 18-only. The highest-risk blockers are:

- `@mui/x-date-pickers@6.20.2`
- `@react-spring/web@9.5.5`
- `react-hook-form-mui@6.8.0`
- `react-svg@16.1.33`
- `usehooks-ts@2.16.0`
- `notistack@3.0.1`
- `@tanstack/react-virtual@3.2.0`

In application code, the app bootstrapping already uses `createRoot` and `StrictMode` (good baseline), but there is usage of a router internal API (`UNSAFE_NavigationContext`) that is brittle and should be removed before a major React/router upgrade.

## What was checked

- Project dependency declarations in `package.json`
- Installed dependency tree and peer support (`npm ls react --depth=2`)
- Installed package peerDependency ranges (scripted read from `node_modules/**/package.json`)
- Source patterns commonly problematic in major React upgrades (`createRoot`/legacy APIs/UNSAFE usage)

## Dependency compatibility snapshot

### Likely compatible with React 19

These packages currently advertise React 19-compatible peer ranges:

- `@mui/material@6.4.8`
- `@mui/icons-material@6.4.8`
- `@reduxjs/toolkit@2.11.2`
- `react-redux@9.2.0`
- `react-hook-form@7.69.0`
- `react-intersection-observer@9.13.0`
- `@tanstack/react-table@8.13.2` (broad range `>=16`)

### Potential blockers (peer range does not include React 19)

| Package | Current version | Peer range (react/react-dom) | Why this matters |
|---|---:|---|---|
| `@mui/x-date-pickers` | `6.20.2` | `^17 || ^18` | npm/yarn may warn or block on strict peer checks when upgrading React to 19. |
| `@react-spring/web` | `9.5.5` | `^16.8 || ^17 || ^18` | Animation internals can be sensitive to scheduler/concurrency behavior. |
| `react-hook-form-mui` | `6.8.0` | `>=17 <19` | Explicitly excludes React 19. |
| `react-svg` | `16.1.33` | `^16 || ^17 || ^18` | Needs a 19-compatible release verification. |
| `usehooks-ts` | `2.16.0` | `^16.8 || ^17 || ^18` | Utility hooks package may only be tested against <=18. |
| `notistack` | `3.0.1` | `^16.8 || ^17 || ^18` | Snackbar provider could still work but is not declared compatible. |
| `@tanstack/react-virtual` | `3.2.0` | `^16.8 || ^17 || ^18` | Virtualization library should be validated under 19 scheduling. |

## Code-pattern risks in this repository

## 1) Router internals (`UNSAFE_NavigationContext`)

`src/hooks/use-history-back.ts` imports and uses `UNSAFE_NavigationContext` from `react-router-dom`. This is an internal/unstable API and increases upgrade risk because router internals can change independently while migrating React versions.

**Recommendation:** rewrite this hook to use public router APIs only.

## 2) Legacy root API check

`src/index.tsx` already uses `ReactDOM.createRoot(...)` + `StrictMode`, which is the expected baseline for React 18/19 migration.

**Recommendation:** keep this structure; no action needed here.

## 3) Type package alignment

Dev dependencies currently pin React type packages to React 18 majors:

- `@types/react@^18.0.28`
- `@types/react-dom@^18.0.11`

For TypeScript projects, upgrade these with React runtime to avoid type drift.

## Recommended migration path

1. **Dependency unblock pass (no runtime upgrade yet)**
   - Upgrade/replace peer-blocking libraries until all critical packages include React 19 in peer ranges.
   - Particularly target `@mui/x-date-pickers`, `react-hook-form-mui`, `@react-spring/web`, and `react-svg` first.

2. **Code hardening pass**
   - Remove `UNSAFE_NavigationContext` usage from `useHistoryBack`.
   - Run app flows that rely on history/back-navigation and modal routing.

3. **React 19 upgrade branch**
   - Upgrade `react`, `react-dom`, `@types/react`, `@types/react-dom` together.
   - Reinstall dependencies and resolve peer warnings.

4. **Validation matrix**
   - Run lint + tests.
   - Manually verify high-risk UI areas: date pickers, snackbar stack, animated components, virtualized tables/lists, graph rendering (`reagraph`).

## Suggested “go/no-go” criteria

Proceed to production rollout only when:

- No unresolved React 19 peer dependency conflicts remain in critical UI paths.
- Routing/back-navigation hook no longer depends on `UNSAFE_*` APIs.
- CI (typecheck/lint/tests) passes on React 19 lockfile.
- Smoke tests for critical user journeys pass in staging.
