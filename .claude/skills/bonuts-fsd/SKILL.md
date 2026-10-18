---
name: bonuts-fsd
description: Feature-Sliced Design boundaries for the Bonuts client — layer and slice structure, where a new component belongs, import rules enforced by the fsd:check script, and file naming. Use when creating, moving, or renaming files, deciding between shared/ui and entities/*/ui, resolving import-path questions, or fixing FSD boundary violations.
---

# Bonuts FSD

Follow Feature-Sliced Design when making changes in this repository. Import boundaries are machine-enforced — see "Verify" below.

## Layers

- `src/shared` — cross-cutting utilities, types, auth model, hooks, constants. Framework-agnostic where possible.
- `src/entities` — domain entities and the domain UI around them. Keep logic close to the entity.
- `src/features` — business-logic modules implementing a specific application feature.
- `src/widgets` — complex composable UI blocks combining multiple components, may include business logic.
- `src/pages` — page-level components composing widgets and features.
- `src/app` — application-level setup (providers, router).
- `src/themes` — theming, MUI theme helpers, context.

Dependency direction: `shared → entities → features → widgets → pages → app`.

`src/components`, `src/hooks`, `src/logic`, `src/utils`, `src/constants`, `src/context`, `src/routes`, `src/services`, `src/types` are legacy. Do not add new code there; move code toward FSD when touching it.

## Where does this component go?

- Put domain-specific UI in the domain slice that owns it.
  - Invitation UI → `entities/invitation/ui`; invitation flows → `features/.../ui` or `pages/.../ui`.
  - Profile UI → `entities/profile/ui`; event UI → `entities/event/ui`; and so on.
- Use `shared/ui` only for truly generic, cross-domain UI primitives that do not encode product-domain meaning.
- If a component name, props, copy, or data shape are tied to a specific domain concept, default to `entities/*/ui` instead of `shared/ui`.

## Slice structure

In sliced layers (`pages`, `features`, `entities`, `widgets`) a file must be either:
- `src/<layer>/<slice>/index.ts(x)`, or
- `src/<layer>/<slice>/<segment>/<file>`

For domain-grouped layers (`features`, `widgets`) this is also allowed:
- `src/<layer>/<domain>/<slice>/index.ts(x)`
- `src/<layer>/<domain>/<slice>/<segment>/<file>`

`<segment>` must be one of: `ui`, `model`, `lib`, `api`, `config`.

## Import rules

- Cross-slice imports go through the public interface.
  - Good: `@/entities/profile`, `@/shared/ui/profile-avatar`
  - Bad: deep imports into another slice's internals, e.g. `@/entities/profile/model/...`
- Within the same slice (`ui` → `model`, `ui` → `ui`), use **relative** paths. Do not use `@/...` for same-slice segment imports.
- For outer imports from `src`, use the `@/...` alias.
- Never use bare aliases: `shared/...`, `entities/...`, `features/...`, `widgets/...`, `pages/...`, `app/...`. These are legacy and blocked by the checker. (Note: `README.md` and `.junie/guidelines.md` still say "absolute imports from src root" — that is outdated; `@/...` is the current convention and matches the overwhelming majority of the codebase.)
- Page internals cannot be imported directly via `@/pages/<slice>/...` — use `@/pages/<slice>` or a relative import inside the same page slice.
- Public surface per folder is an `index.ts` barrel. Avoid giant barrels that cause circular deps.

## File naming

- Files: `kebab-case`
- React components: `PascalCase`
- Variables and functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

## Verify

The rules above are enforced by `scripts/check-fsd-boundaries.mjs`:

```bash
yarn fsd:check:working-tree   # staged + unstaged + untracked
yarn fsd:check:staged
yarn fsd:check                # whole repo
```

`yarn lint` already runs `fsd:check:working-tree`.

Rules: `no-legacy-bare-alias`, `no-cross-slice-deep-import`, `no-absolute-same-slice-segment-import`, `no-page-direct-file-import`, `no-invalid-slice-segment-structure`. Details and the temporary-exception allowlist (`scripts/fsd-boundaries-allowlist.json`) are documented in `scripts/fsd-boundaries/README.md`.

Only add an allowlist entry for a genuine migration exception, with a `reason`. Prefer fixing the import.

## Scope discipline

- When touching existing code, move it closer to FSD compliance instead of adding new violations.
- Do not perform broad FSD refactors unless the task requires them.
- If you notice an FSD violation relevant to the task, call it out explicitly in your response.

Migration context and phased plan: `docs/fsd-migration-plan.md`, `docs/fsd-phase-0-baseline.md`, `docs/fsd-phase-1-guardrails.md`.
