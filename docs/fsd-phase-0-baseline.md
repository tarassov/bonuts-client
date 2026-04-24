# FSD Migration Phase 0 Baseline

Date: 2026-04-23
Scope: `src/**/*.ts`, `src/**/*.tsx`

## Task Type
- frontend architecture
- refactor/cleanup

## Snapshot Summary
- TypeScript source files scanned: `686`
- Import statements using `@/...`: `574`
- Import statements using bare top-level aliases (legacy style): `1219`
- Estimated total non-relative import statements: `1635`

This confirms a mixed import model and a high dependency on legacy alias paths.

## Current Structure Status
Top-level source folders currently include both FSD and legacy structures:
- FSD-oriented: `app`, `pages`, `widgets`, `features`, `entities`, `shared`
- Legacy/global buckets: `components`, `services`, `logic`, `hooks`, `constants`, `utils`, `types`, `routes`, `context`, `themes`

This mixed model is the main architectural migration risk.

## Violation Baseline (Phase 0)

### 1) Wrong alias usage (legacy bare aliases)
Count by alias prefix:
- `shared/`: `474`
- `services/`: `284`
- `hooks/`: `138`
- `components/`: `116`
- `constants/`: `75`
- `logic/`: `62`
- `utils/`: `36`
- `routes/`: `18`
- `themes/`: `12`
- `context/`: `4`

Representative examples:
- `src/app/config/modal-config.tsx` imports `components/...`, `constants/...`, `services/...`
- `src/app/ui/app.tsx` imports `services/...`, `routes/...`, `themes/...`, `context/...`
- `src/widgets/integration-settings/ui/notification-item.tsx` imports `services/...`, `shared/...`

### 2) Cross-slice internal imports (public API bypass)
Potential internal deep imports through alias paths:
- `@/features/<slice>/<segment>/...`: `19`
- `@/entities/<slice>/<segment>/...`: `9`
- `@/widgets/<slice>/<segment>/...`: `10`
- `@/shared/<slice>/<segment>/...`: `138`

Representative examples:
- `src/widgets/plugin-list/ui/plugin-list.tsx` imports `@/features/plugin/model/use-plugin-update`
- `src/widgets/employee-directory/ui/employee-list.tsx` imports `@/entities/profile/model/use-employee-list`
- `src/pages/event-page/ui/event-page.tsx` imports `@/entities/event/ui/event-detailed`

Note: some deep imports may be same-slice or transitional; classification is intentionally conservative for migration planning.

### 3) Missing public API entry points (`index.ts`) in slices
- `entities`: `0/8` missing
- `features`: `3/5` missing (`3cx`, `employee`, `profile`)
- `widgets`: `1/9` missing (`dashboard-social`)
- `pages`: `23/26` missing

### 4) Legacy import usage inside FSD layers
Legacy bare-alias imports found inside:
- `app`: `40`
- `pages`: `105`
- `widgets`: `95`
- `features`: `73`
- `entities`: `93`

This indicates FSD folders exist, but import boundaries are not yet enforced.

## Target Map Confirmed
Migration target stays:
- `app`
- `pages`
- `widgets`
- `features`
- `entities`
- `shared`

Legacy buckets (`components`, `logic`, `services`, etc.) should be drained into these layers by domain migration phases.

## No-New-Drift Policy (Effective Immediately)
For all new/changed code before Phase 1 tooling hardening:
1. No new bare top-level aliases (`shared/...`, `services/...`, `components/...`, etc.).
2. Use `@/...` for cross-slice imports.
3. Use relative imports inside the same slice segment.
4. Avoid importing another slice’s internal `ui/model/lib/api` directly; prefer that slice public API.
5. New slices and moved slices must expose `index.ts` public entry.
6. Temporary exceptions require inline marker:
   - `// FSD-MIGRATION-TODO(owner, yyyy-mm-dd): reason`

## Prioritized Migration Starting Points
1. `app` composition + routing config imports (`app/config`, `app/ui`) to remove central legacy dependencies.
2. `widgets` with deep feature/entity imports (`plugin-list`, `employee-directory`, `scheduler`).
3. `features/profile` and `features/employee` public API completion.
4. `pages` entry-point normalization (`index.ts` coverage).

## Risks/Tradeoffs Discovered in Phase 0
- Large dependency on `services/` and `shared/` bare imports can create high-touch migration PRs.
- `pages` lacking public APIs will make boundary enforcement noisy unless normalized early.
- Some cross-slice deep imports currently couple widgets directly to feature/entity internals.

## Validation Method
Baseline was produced via repository scan commands:
- `find` for structure and file counts
- `grep` for import-pattern metrics
- slice-level index-file checks for public API coverage

