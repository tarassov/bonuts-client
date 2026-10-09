# MUI Upgrade Research

Research date: 2026-06-30

## Current State

The project currently uses:

- `@mui/material`: `6.5.0`
- `@mui/icons-material`: `6.5.0`
- `@mui/x-date-pickers`: `6.20.2`
- React: `19`
- TypeScript: `5.4`

Material UI and MUI X are not aligned by major version: core Material UI is on v6, while date pickers are still on MUI X v6 as well, but with older APIs that are likely to need manual migration before moving to current major versions.

Official references:

- Material UI v7 migration: https://mui.com/material-ui/migration/upgrade-to-v7/
- Material UI v9 migration: https://mui.com/material-ui/migration/upgrade-to-v9/
- MUI X pickers v6 migration: https://mui.com/x/migration/migration-pickers-v6/
- MUI X pickers v7 migration: https://mui.com/x/migration/migration-pickers-v7/
- MUI X pickers v8 migration: https://mui.com/x/migration/migration-pickers-v8/

## Summary

The upgrade is possible, but it should not be done as one large dependency bump.

- Upgrading within the latest v6 patch line is low risk.
- Moving Material UI from v6 to v7 is medium risk.
- Moving Material UI from v6 directly to the latest major version is high risk.
- Moving MUI X Date Pickers from v6 to later major versions is medium to high risk because picker and field APIs changed significantly.

The biggest risk is not basic components such as `Button`, `Box`, or `Stack`. The risk is concentrated in shared UI wrappers, theme customization, CSS variables, Grid usage, and date/time picker wrappers.

## Main Risks

### Grid API

The codebase uses both newer and older Grid patterns:

- Newer `Grid2 as Grid` imports from `@mui/material`.
- Older `<Grid item xs={...}>` usage across multiple files.

Material UI v7 changes the Grid naming:

- `Grid2` becomes `Grid`.
- The old `Grid` becomes `GridLegacy`.

This can cause layout and type errors if the migration is done mechanically without reviewing page grids.

Relevant areas include dashboard, profile edit, employee edit, invitation lists, tenant lists, donut lists, employee directory, scheduler forms, and shared form layout.

### Text Field And Slot Props

The codebase still uses several props that are deprecated or removed in newer Material UI versions:

- `InputProps`
- `inputProps`
- `InputLabelProps`
- `SelectProps`

Newer Material UI versions move these toward `slots` and `slotProps`, for example:

- `slotProps.input`
- `slotProps.htmlInput`
- `slotProps.inputLabel`
- `slotProps.select`

The highest-value place to migrate these first is shared input wrappers, because page-level usage depends on them.

Relevant files:

- `src/shared/ui/input/text-input.tsx`
- `src/shared/ui/input/text-input-element.tsx`
- `src/shared/ui/input/text-area-input.tsx`
- `src/shared/ui/input/date-picker.tsx`
- `src/shared/ui/input/time-picker-element.tsx`
- `src/shared/ui/form/fields/bnt-form-text-field.tsx`
- `src/shared/ui/form/fields/bnt-tag-autocomplete.tsx`

### Date And Time Pickers

`@mui/x-date-pickers` is a separate migration track from `@mui/material`.

Risk areas:

- Adapter imports and date-fns compatibility.
- Picker field DOM structure.
- Picker text field slot props.
- `react-hook-form-mui` compatibility.
- Locale text types and provider props.

Relevant files:

- `src/shared/ui/locale/date-fns-provider.tsx`
- `src/shared/ui/locale/locale-provider.tsx`
- `src/shared/ui/locale/picker-locale-context.ts`
- `src/shared/ui/input/date-picker.tsx`
- `src/shared/ui/input/time-picker-element.tsx`
- `src/components/tie-graph/tie-graph.tsx`

### Theme And Type Augmentation

The project extends MUI theme types and palette tokens.

Relevant files:

- `src/types/theme/index.ts`
- `src/hooks/use-custom-theme.ts`
- `src/themes/light-theme.ts`
- `src/themes/dark-theme.ts`
- `src/themes/form-components.ts`

Specific risk:

- `@mui/material/styles/createPalette` augmentation should be checked against newer MUI guidance.
- CSS variables are enabled with `createTheme({ ...themeOptions, cssVariables: true })`.
- Several CSS Modules depend on `var(--mui-...)` tokens.

Visual regression risk is meaningful here because Bonuts relies on warm, clear, recognition-centric UI surfaces rather than a cold admin-console feel.

### MUI Class Selectors

The project customizes MUI internals with selectors such as:

- `.MuiInputBase-root`
- `.MuiOutlinedInput-notchedOutline`
- `.MuiCardHeader-*`
- `.MuiBadge-badge`
- `.MuiDrawer-paper`

These selectors are usually stable enough across minor versions, but they must be visually checked across major upgrades.

Relevant areas:

- auth forms
- search input
- drawer/sidebar
- event cards
- profile UI
- segmented tabs
- badges

### Icon Package

There are several outline icon imports. Icon packages are usually low risk, but major upgrades can remove aliases or change generated exports.

This should be covered by TypeScript, but the migration should still include a typecheck after the package bump.

## Recommended Migration Plan

1. Upgrade `@mui/material` and `@mui/icons-material` to the latest compatible v6 patch.
2. Run `yarn typecheck`, `yarn build`, and focused UI smoke checks.
3. Migrate shared input wrappers away from deprecated TextField props where practical.
4. Align `@mui/x-date-pickers` and `react-hook-form-mui` compatibility in a separate branch.
5. Migrate old `Grid` usages to the new API or explicitly isolate them as legacy usage.
6. Upgrade Material UI to v7 in a dedicated PR.
7. Run visual checks on mobile and desktop for dashboard, profile edit, invitations, requests, scheduler, login, and date/time forms.
8. Consider v8/v9 only after v7 is stable in production or staging.

## Validation Checklist

Run:

```bash
yarn typecheck
yarn build
yarn test:withoutWatch
yarn cypress:run:login
```

Also perform manual or visual checks for:

- login and registration forms
- dashboard feed and sidebar layout
- profile edit form
- invitation pages
- requests page and filters
- scheduler date/time forms
- employee directory
- dark and light themes
- mobile layouts for grid-heavy pages

## Bonuts Product Considerations

The upgrade should preserve:

- warm recognition-focused surfaces
- clear form hierarchy
- lightweight mobile layouts
- readable status and identity cues
- reduced admin friction

The main product risk is accidental visual drift: default MUI changes can make the app feel colder, denser, or more admin-like if forms, cards, and surfaces are not reviewed after the migration.
