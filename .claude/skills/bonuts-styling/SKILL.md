---
name: bonuts-styling
description: Styling rules for the Bonuts client — when to use CSS Modules vs MUI styled() vs sx, the golden-middle convention, design tokens, and the style-review checklist. Use when writing or editing any component styling, creating .module.scss or *.styles.tsx files, reviewing styling consistency, or deciding where a visual rule belongs.
---

# Bonuts Styling

This project uses three styling layers intentionally. Choose by responsibility, not by habit.

## Quick decision

| Need | Use |
|---|---|
| page/section layout, grids, complex responsive composition | CSS Modules (`*.module.scss`) |
| reusable visual primitive, repeated MUI override pattern | `styled()` |
| tiny local tweak, dynamic value, theme-specific nudge | `sx` |
| simple local composition inside one component | `Stack` or grid |

## CSS Modules

Use CSS Modules for:
- page and section layout
- structural wrappers and grid composition
- complex responsive layout composition

In complex layouts, prefer CSS Modules by default. The repo convention is `*.module.scss` (SCSS, not plain CSS).

Combine class names with `classnames`, imported as `cn`:

```ts
import cn from "classnames";
```

Exceptions where `sx` is fine instead:
- theme-specific styles
- dynamically calculated styles
- small base layout adjustments like local margin or padding, as long as it stays light and readable

CSS Modules must NOT style MUI internals or override MUI-generated classes. That is a signal to extract a `styled()` component.

## MUI styled()

Use `styled()` for:
- reusable UI components
- shared visual primitives
- components with repeated visual rules
- design-system-aligned wrappers
- reusable components created in `shared/ui`
- components that redefine or wrap MUI classes in a consistent way

Prefer `styled()` for reusable visual components in `shared/ui`.

When a component's `styled()` declarations contain no behavior or rendering logic, place them in a sibling `element.styles.tsx` file (for example `bnt-carousel.styles.tsx`). Keep the component file focused on state, callbacks, and markup.

Use CSS Modules in `shared/ui` only when a reusable component has substantial internal layout structure and `styled()` would make the code less readable.

Do NOT extract trivial one-property or very small wrappers into `styled()` just because the component is reused. If styling only sets a very small number of simple properties, keep it local.

Strong signals to extract into `shared/ui`:
- the component redefines MUI internal classes, or repeats the same MUI visual overrides
- the component is used in 2 or more places
- a wrapper carries a reusable visual surface treatment (border radius + border + shadow + background/theme-dependent surface) that would otherwise be repeated inline in `sx`

## MUI sx

Use `sx` only for:
- small local adjustments
- spacing tweaks
- one-off overrides close to usage
- theme-specific visual adjustments that should stay near the component
- dynamic values that are awkward to express in static CSS
- small local style blocks with no more than 5 properties, preferably no more than 4

Do NOT:
- build large reusable components mainly with `sx`
- scatter layout logic across many inline `sx` props
- mix CSS Modules, `styled()`, and large inline `sx` without a clear reason
- use heavy `sx` objects for reusable shared UI when a `styled()` component would be clearer
- use deprecated MUI styling props when `slotProps` or the current API solves the same problem
- let `sx` define component identity or reusable styles

## Golden Middle Convention

- Use an intent-based choice, not a forced single styling method.
- A single styling concern must not be handled by more than one system.
- Do not force styling rewrites only for consistency; migrate the styling approach when touching the code or when duplication clearly appears.
- If the styling choice is non-obvious for the file, briefly note the reason in the PR/task response.

## Design system and tokens

- Prefer existing design tokens and theme values over hardcoded values.
- Reuse established spacing, radius, typography, and semantic colors whenever possible.
- Do not invent new visual styles if an existing pattern already solves the problem.
- Keep visual hierarchy calm and clean.
- Avoid visually noisy solutions, heavy shadows, or aggressive accents unless the task explicitly requires them.

Theme-aware helpers live in `src/themes/`. Base product-agnostic visual foundations (color roles, spacing scale, surface and typography principles, mailer notes) are in `docs/base-design-principles.md` — read that file when defining new tokens or styling backend-rendered mailers.

## Mobile-first check

Treat mobile-first as a default, not a later adaptation. Before finalizing UI, check:
- what is the primary small-screen layout?
- what stacks first? what collapses first?
- do key actions remain obvious?
- does the hierarchy still work on narrow screens?

Do not create desktop-only assumptions in new work.

## Style review checklist

When asked to review styling, be strict and opinionated; assume a production codebase where long-term maintainability matters.

1. List violations grouped by system: CSS Modules / `styled()` / `sx`.
2. Explain WHY each is a problem.
3. Suggest a concrete refactor for each.
4. Call out anything done particularly well.
5. Give a verdict: ✅ fully compliant / ⚠️ mostly compliant with minor issues / ❌ not compliant.

Look specifically for:
- a single styling concern handled by more than one system
- CSS Modules overriding MUI-generated classes
- `sx` defining component identity or reusable styles
- repeated `sx` patterns that should be extracted
- layout styles duplicated across systems
