# FSD Boundaries Checker

Custom repository checker for Feature-Sliced Design (FSD) import boundaries.

Entrypoint:
- `scripts/check-fsd-boundaries.mjs`

Core modules:
- `scripts/fsd-boundaries/constants.mjs`
- `scripts/fsd-boundaries/git-files.mjs`
- `scripts/fsd-boundaries/import-rules.mjs`
- `scripts/fsd-boundaries/allowlist.mjs`
- `scripts/fsd-boundaries/source-files.mjs`
- `scripts/fsd-boundaries/checker.mjs`
- `scripts/fsd-boundaries/rules/index.mjs`
- `scripts/fsd-boundaries/rules/no-legacy-bare-alias.mjs`
- `scripts/fsd-boundaries/rules/no-cross-slice-deep-import.mjs`
- `scripts/fsd-boundaries/rules/no-absolute-same-slice-segment-import.mjs`
- `scripts/fsd-boundaries/rules/no-page-direct-file-import.mjs`
- `scripts/fsd-boundaries/rules/no-invalid-slice-segment-structure.mjs`

## What It Checks

Rules currently enforced:
1. `no-legacy-bare-alias`
   - Blocks bare FSD aliases: `app/...`, `pages/...`, `widgets/...`, `features/...`, `entities/...`, `shared/...`
   - Expected style is `@/...` (or relative where appropriate).
2. `no-cross-slice-deep-import`
   - Blocks deep internal imports into another slice segment (for example `@/entities/profile/model/...`).
3. `no-absolute-same-slice-segment-import`
   - Inside one slice (`pages`, `features`, `entities`, `widgets`), segment-to-segment imports must be relative, not absolute `@/...`.
4. `no-page-direct-file-import`
   - Page internals cannot be imported directly via `@/pages/<slice>/...`.
   - Use `@/pages/<slice>` public API, or relative imports inside the same page slice.
5. `no-invalid-slice-segment-structure`
   - In sliced layers (`pages`, `features`, `entities`, `widgets`), files must be either:
     - `src/<layer>/<slice>/index.ts(x)`, or
     - `src/<layer>/<slice>/<segment>/<file>`
     - for domain-grouped layers (`features`, `widgets`) this is also allowed:
       - `src/<layer>/<domain>/<slice>/index.ts(x)`
       - `src/<layer>/<domain>/<slice>/<segment>/<file>`
   - `<segment>` must be one of `ui`, `model`, `lib`, `api`, `config`.

Violation output format:
- `path/to/file.ts:line:column [rule] message`
- This is terminal/IDE clickable in many environments.

## Usage

Run all files:
```bash
node scripts/check-fsd-boundaries.mjs
```

Run only staged files:
```bash
node scripts/check-fsd-boundaries.mjs --staged
```

Run only working tree files (staged + unstaged + untracked):
```bash
node scripts/check-fsd-boundaries.mjs --working-tree
```

Run CI-style diff (`HEAD~1..HEAD`):
```bash
node scripts/check-fsd-boundaries.mjs --ci-changed
```

Run union of CI-changed + working-tree:
```bash
node scripts/check-fsd-boundaries.mjs --changed
```

## NPM Scripts

Defined in `package.json`:
- `yarn fsd:check`
- `yarn fsd:check:staged`
- `yarn fsd:check:working-tree`
- `yarn fsd:check:ci`
- `yarn fsd:check:changed`

## Allowlist Configuration

Allowlist file:
- `scripts/fsd-boundaries-allowlist.json`

Shape:
```json
{
  "violations": [
    {
      "rule": "no-legacy-bare-alias",
      "file": "src/widgets/scheduler/ui/scheduler-form.tsx",
      "importPath": "shared/ui/form/bnt-form-submit",
      "reason": "temporary migration exception"
    }
  ]
}
```

Notes:
- Required match fields: `rule`, `file`
- Optional narrowing: `importPath`

## How To Modify Configuration

### 1) Change which bare aliases are forbidden
Edit:
- `scripts/fsd-boundaries/constants.mjs`

Field:
- `FORBIDDEN_BARE_FSD_ALIAS_PREFIXES`

### 2) Change FSD layers or segments
Edit:
- `scripts/fsd-boundaries/constants.mjs`

Fields:
- `FSD_LAYERS`
- `FSD_SEGMENTS`

### 3) Add or change rule logic
Edit:
- `scripts/fsd-boundaries/rules/*.mjs`
- `scripts/fsd-boundaries/rules/index.mjs`

Rule runner function:
- `collectViolationsForImport(...)` in `rules/index.mjs`
- `collectViolationsForFile(...)` in `rules/index.mjs`

### 4) Change file selection behavior
Edit:
- `scripts/fsd-boundaries/git-files.mjs`
- `scripts/fsd-boundaries/source-files.mjs`
- `scripts/fsd-boundaries/checker.mjs` (`resolveFilesFromArgs`)

### 5) Change output formatting
Edit:
- `scripts/fsd-boundaries/checker.mjs`

Function:
- `formatViolation(...)`

## Troubleshooting

If checker behavior seems wrong:
1. Run with a narrow mode (`--staged` or `--working-tree`) first.
2. Verify allowlist JSON validity.
3. Confirm import path actually matches expected alias format (`@/...`, relative, etc.).
