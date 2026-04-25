# FSD Phase 1 Guardrails

Date: 2026-04-25

## Task Type
- frontend architecture
- integration/tooling work

## What Was Added
- `scripts/check-fsd-boundaries.mjs`
- `scripts/fsd-boundaries-allowlist.json`
- `package.json` scripts:
  - `fsd:check`
  - `fsd:check:changed`
  - `fsd:check:working-tree`
  - `fsd:check:ci`
  - `fsd:check:staged`
- `lint` and `lint:fix` now run FSD boundary checks on working tree files.
- `lint-staged` runs staged-file FSD checks.
- CI workflow now runs:
  - `yarn lint`
  - `yarn typecheck`
  - `yarn fsd:check:ci`

## Enforced Rules
1. No legacy bare aliases:
   - `app/...`, `pages/...`, `widgets/...`, `features/...`, `entities/...`, `shared/...`
   - non-FSD legacy aliases (`hooks/...`, `services/...`, `components/...`, etc.) are intentionally not blocked by this rule
2. No cross-slice deep imports:
   - e.g. `@/features/<slice>/model/<internal-file>`
3. No absolute imports for same-slice segment internals:
   - e.g. from `widgets/<slice>/ui/*` to `@/widgets/<slice>/ui/*` (must be relative)

## Modes
- `fsd:check`: full repository scan (expected to fail until migration debt is removed).
- `fsd:check:working-tree`: only staged/unstaged/untracked TS/TSX files.
- `fsd:check:staged`: staged TS/TSX files only.
- `fsd:check:ci`: latest commit diff (`HEAD~1..HEAD`) TS/TSX files.
- `fsd:check:changed`: union of `working-tree` and `ci`.

## Temporary Allowlist
Allowlist file: `scripts/fsd-boundaries-allowlist.json`

Format:
```json
{
  "violations": [
    {
      "rule": "no-legacy-bare-alias",
      "file": "src/widgets/scheduler/ui/scheduler-form.tsx",
      "importPath": "shared/ui/form/bnt-form-submit",
      "reason": "Phase-1 temporary migration exception"
    }
  ]
}
```

Notes:
- `file` + `rule` are required for match.
- `importPath` is optional and narrows matching.
