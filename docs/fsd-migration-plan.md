# Bonuts Frontend: Total Migration to Feature-Sliced Design (FSD)

## Task Type
- frontend architecture
- refactor/cleanup

## Goal
Complete a safe, staged migration of the frontend to FSD so all new and existing work follows clear slice boundaries, public APIs, and readable module ownership.

## Why This Fits Bonuts
- Faster feature delivery in recognition-focused areas by reducing cross-module coupling.
- Lower cognitive load in admin/settings flows through clearer ownership.
- Better consistency for mobile-first and UI/system decisions across teams.
- Fewer regressions from accidental internal imports and mixed responsibilities.

## Success Criteria
- No cross-slice internal imports outside public APIs.
- No bare top-level aliases like `shared/...`, `entities/...`, `features/...`; use `@/...`.
- Same-segment imports remain relative.
- Non-UI helpers moved out of component files where practical.
- CI enforces boundary rules (lint + typecheck + tests).
- Migration completed domain by domain with no major user-facing regressions.

## Phase 0: Baseline and Target Definition (Week 1)
1. Audit current structure and imports.
2. Tag violations:
   - cross-slice internal import
   - wrong alias usage
   - mixed concerns in component files
   - missing public API index files
3. Define target map:
   - `app/`
   - `pages/`
   - `widgets/`
   - `features/`
   - `entities/`
   - `shared/`
4. Document layer import rules and segment conventions (`ui`, `model`, `lib`, `api`, `config`).
5. Freeze new architectural drift:
   - new code must follow target rules
   - exceptions require explicit TODO + owner

Phase 0 execution artifact:
- `docs/fsd-phase-0-baseline.md` (snapshot date: 2026-04-23)

## Phase 1: Guardrails in Tooling (Week 1-2)
1. Add Biome + custom boundary validation for FSD layers and public API usage.
2. Add/normalize TS path aliases for `@/...`.
3. Add lint/validation checks for:
   - forbidden internal imports from other slices
   - forbidden bare top-level aliases
4. Enforce `import type` for type-only imports where possible.
5. Add CI gates:
   - `lint`
   - `typecheck`
   - targeted test run
6. Introduce temporary allowlist for known legacy paths with expiration dates.

## Phase 2: Shared and Entities Foundation (Week 2-3)
1. Stabilize `shared/`:
   - move reusable visual primitives to `shared/ui` (prefer `styled()` for reusable wrappers)
   - keep layout-heavy structures in CSS Modules
   - keep tiny local tweaks in `sx`
2. Normalize common helpers into `shared/lib`.
3. Migrate base domain models into `entities/*`.
4. Expose strict public APIs (`index.ts`) for every migrated entity/shared package.
5. Update imports to only use those public APIs.

## Phase 3: Feature Slice Migration by Vertical Domain (Week 3-6)
Migrate domain-by-domain, not by file type.

Suggested order:
1. recognition feed / activity
2. profile and identity surfaces
3. badges/status/leaderboard
4. admin/settings areas
5. store/mechanics (if present), without increasing store-first emphasis

For each domain:
1. Move files into FSD segments (`ui`, `model`, `lib`, `api`).
2. Extract non-UI logic from component files into helpers/model.
3. Replace cross-domain internals with feature/entity public APIs.
4. Localize any touched hardcoded user-facing strings.
5. Validate mobile-first layout behavior in affected UI.
6. Run lint/typecheck/tests before moving to next domain.

## Phase 4: Widgets, Pages, and App Layer Cleanup (Week 6-7)
1. Rebuild page composition via `widgets` + `features` + `entities`.
2. Keep routing/composition concerns in `pages` and `app` only.
3. Remove duplicated local abstractions now replaced by slice contracts.
4. Ensure protected/auth/plugin behavior remains unchanged unless explicitly intended.

## Phase 5: Hardening and Legacy Removal (Week 7-8)
1. Remove temporary adapters and migration allowlists.
2. Tighten lint rules from warning to error where still soft.
3. Run full regression:
   - unit/integration tests
   - Cypress for desktop + mobile viewports where behavior should match
4. Final architecture pass: unresolved violations must be fixed or explicitly documented.
5. Publish “how to add code in FSD” team guide in docs.

## Operational Plan and Ownership
- Architecture owner: defines boundaries, approves exceptions.
- Domain owners: execute per-domain migration and regression checks.
- QA owner: validates responsive behavior and key user flows.
- Each phase ends with a checklist sign-off and violation count delta.

## Risks and Tradeoffs
- High churn in imports can increase merge conflicts.
- Temporary complexity while adapters coexist with new slices.
- Over-refactoring risk: migration must stay scoped to architecture and readability.
- CI strictness may slow delivery briefly, but prevents regression later.

## Mitigations
- Migrate in small vertical batches.
- Keep PR size bounded by domain area.
- Use temporary compatibility wrappers with explicit removal deadlines.
- Avoid unrelated renames/moves unless they reduce migration risk.

## Validation Checklist (Per PR)
1. FSD import boundaries respected.
2. Public API exports added/updated.
3. `@/...` aliases used for cross-slice imports.
4. Same-segment imports kept relative.
5. Non-UI logic extracted from component where practical.
6. Touched UI remains mobile-usable.
7. New/touched user-facing strings localized.
8. Lint + typecheck + relevant tests pass.

## Bonuts UX Guardrails During Migration
- Prioritize recognition visibility, identity, and engagement surfaces.
- Do not let admin/settings patterns dominate visual hierarchy.
- Keep UI calm and readable; reuse tokens/theme values instead of introducing noisy styles.
- Ensure migration does not make product flows feel more transactional.

## Files Expected to Change During Execution
- `src/app/**`
- `src/pages/**`
- `src/widgets/**`
- `src/features/**`
- `src/entities/**`
- `src/shared/**`
- `biome` config
- custom FSD boundary validation script (if needed for import rules not covered by Biome)
- `tsconfig` paths
- test and Cypress coverage related to migrated domains
