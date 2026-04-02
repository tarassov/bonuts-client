# Code Style

This page captures the frontend code-style rules used in the Bonuts client.

For product, UX, and task-framing guidance, see [AGENTS.md](../AGENTS.md).

## Readability

- Prefer the most readable implementation by default.
- It is acceptable to write more code if that makes the logic easier to read and maintain.
- Avoid combining multiple behaviors into a single abstraction when separate explicit branches are easier to understand.
- The only exception is when the more readable version would cause a meaningful performance regression.
- Prefer explicit naming over compact cleverness.
- Prefer small understandable transformations over dense chained logic.

## Feature-Sliced Design

- Follow Feature-Sliced Design when making changes in this repository.
- Prefer public interfaces for cross-slice imports.
  Good: `@/entities/profile`
  Avoid: imports from internal files of another slice
- When touching existing code, try to move it closer to FSD-compliant structure instead of adding new violations.
- Do not perform broad FSD refactors unless they are necessary for the task.

## TypeScript

- Import types using `import type` whenever possible.
- If you touch code where types are imported incorrectly, fix those imports as part of the change.
- Type aliases should start with `T`.
- Interfaces should start with `I`.
- Prefer defining reusable types outside the component body.
- Prefer moving non-props component-local types out of the component body and, when it improves readability, out of the component file to reduce visual noise in the component.
- Component props are the exception: keep component props types or interfaces in the same file as the component.
- In Feature-Sliced Design, prefer defining non-trivial types in the `model` segment when they are shared beyond one component.
- Prefer precise types over `any`.
- Avoid introducing weak typing unless there is a real integration constraint.
- When narrowing types improves readability, prefer explicit guards.

## Localization

- Do not leave new user-facing strings hardcoded in components.
- Localize button labels, helper text, validation messages, empty states, and error or fallback copy.
- If you touch a component with hardcoded user-facing strings, fix those strings as part of the change when practical.

## Styling

This project uses three styling layers intentionally.

### CSS Modules

Use CSS Modules for:

- page and section layout
- structural wrappers and grid composition
- complex responsive layout composition

In complex layouts, prefer CSS Modules by default.

For layout structure:

- prefer `Stack` or grid for simple local composition inside a component
- prefer CSS Modules for page-level layout and more complex responsive composition

Exceptions:

- `sx` is acceptable for theme-specific styles
- `sx` is acceptable for dynamically calculated styles
- `sx` is acceptable for small base layout adjustments like local margin or padding, but it must stay light and readable

### MUI styled()

Use `styled()` for:

- reusable UI components
- shared visual primitives
- components with repeated visual rules
- design-system-aligned wrappers
- reusable components created in `shared/ui`
- components that redefine or wrap MUI classes in a consistent way

Prefer `styled()` for reusable visual components in `shared/ui`.

Use CSS Modules in `shared/ui` only when a reusable component has substantial internal layout structure and `styled()` would make the code less readable.

Do not extract trivial one-property or very small wrappers into `styled()` just because the component is reused.

If styling only sets a very small number of simple properties, keep it local instead of creating a separate styled primitive.

If a component redefines MUI internal classes or repeatedly applies the same MUI visual overrides, that is a strong signal to extract a dedicated reusable component instead of repeating overrides inline.

If a component is used in 2 or more places, or repeats the same MUI override pattern, strongly consider extracting it into `shared/ui`.

### MUI sx

Use `sx` only for:

- small local adjustments
- spacing tweaks
- one-off overrides close to usage
- theme-specific visual adjustments that should stay near the component
- dynamic values that are awkward to express in static CSS
- small local style blocks with no more than 5 properties, and preferably no more than 4

Do NOT:

- build large reusable components mainly with `sx`
- scatter layout logic across many inline `sx` props
- mix CSS Modules, `styled()`, and large inline `sx` without a clear reason
- use heavy `sx` objects for reusable shared UI when a `styled()` component would be clearer
- use deprecated MUI styling props when `slotProps` or the current API solves the same problem

Preferred rule:

- layout in CSS Modules
- reusable component styling in `styled()`
- tiny local tweaks in `sx`
- `Stack` or grid for simple component-level layout structure
- if styling only defines one simple property, do not extract it into a separate `styled()` component

## Design System

- Prefer existing design tokens and theme values over hardcoded values.
- Reuse established spacing, radius, typography, and semantic colors whenever possible.
- Do not invent new visual styles if an existing pattern already solves the problem.
- Keep visual hierarchy calm and clean.
- Avoid visually noisy solutions, heavy shadows, or aggressive accents unless the task explicitly requires them.
