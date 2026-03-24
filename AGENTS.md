# Frontend AGENTS.md

## Bonuts Frontend Context

This repository contains the Bonuts frontend.

Bonuts is a social recognition product for SMB teams.
The frontend should reinforce:
- recognition
- engagement
- visibility
- status
- ease of use
- emotional clarity

The product should NOT feel like:
- an accounting dashboard
- a store-first product
- a logistics panel
- an enterprise admin console

When making frontend decisions, prefer solutions that make the experience feel:
- lighter
- warmer
- clearer
- more socially meaningful

---

## Task Framing

Before making non-trivial changes, briefly classify the task:
- product logic
- UI/UX refinement
- styling/system consistency
- frontend architecture
- admin/settings flow
- social engagement feature
- integration/plugin work
- refactor/cleanup

For non-trivial changes, structure the result like this:
1. Task type
2. What changed
3. Why this fits Bonuts
4. Files affected
5. Risks/tradeoffs
6. Validation steps

For UI tasks, also mention:
- mobile-first implications
- styling approach used
- whether the change improves recognition visibility or reduces admin friction

---

## Code Readability

- Prefer the most readable implementation by default.
- It is acceptable to write more code if that makes the logic easier to read and maintain.
- Avoid combining multiple behaviors into a single abstraction when separate explicit branches are easier to understand.
- The only exception is when the more readable version would cause a meaningful performance regression.
- Prefer explicit naming over compact cleverness.
- Prefer small understandable transformations over dense chained logic.

---

## Feature-Sliced Design

- Follow Feature-Sliced Design when making changes in this repository.
- Prefer public interfaces for cross-slice imports.
    - Good: `@/entities/profile`
    - Avoid: imports from internal files of another slice
- When touching existing code, try to move it closer to FSD-compliant structure instead of adding new violations.
- If you notice an FSD violation that is relevant to the task, call it out explicitly in your response.
- Do not perform broad FSD refactors unless they are necessary for the task.

---

## TypeScript Rules

- Import types using `import type` whenever possible.
- If you touch code where types are imported incorrectly, fix those imports as part of the change.
- Type aliases should start with `T`.
- Interfaces should start with `I`.
- Prefer defining reusable types outside the component body.
- Prefer moving non-props component-local types out of the component body and, when it improves readability, out of the component file to reduce visual noise in the component.
- Component props are the exception: keep component props types/interfaces in the same file as the component.
- In Feature-Sliced Design, prefer defining non-trivial types in the `model` segment when they are shared beyond one component.
- Prefer precise types over `any`.
- Avoid introducing weak typing unless there is a real integration constraint.
- When narrowing types improves readability, prefer explicit guards.

## Localization Rules

- Do not leave new user-facing strings hardcoded in components.
- Localize button labels, helper text, validation messages, empty states, and error/fallback copy.
- If you touch a component with hardcoded user-facing strings, fix those strings as part of the change when practical.

---

## Styling Rules

This project uses three styling layers intentionally.

### CSS Modules
Use CSS Modules for:
- page layout
- section layout
- grids
- structural wrappers
- composition of larger screen areas

### MUI styled()
Use `styled()` for:
- reusable UI components
- shared visual primitives
- components with repeated visual rules
- design-system-aligned wrappers

### MUI sx
Use `sx` only for:
- small local adjustments
- spacing tweaks
- one-off overrides close to usage

Do NOT:
- build large reusable components mainly with `sx`
- scatter layout logic across many inline `sx` props
- mix CSS Modules, `styled()`, and large inline `sx` without a clear reason

Preferred rule:
- layout in CSS Modules
- reusable component styling in `styled()`
- tiny local tweaks in `sx`

---

## Design System and Tokens

- Prefer existing design tokens and theme values over hardcoded values.
- Reuse established spacing, radius, typography, and semantic colors whenever possible.
- Do not invent new visual styles if an existing pattern already solves the problem.
- Keep visual hierarchy calm and clean.
- Avoid visually noisy solutions, heavy shadows, or aggressive accents unless the task explicitly requires them.

---

## Mobile-First UX

- Treat mobile-first as a default, not as a later adaptation.
- Before finalizing UI, check:
    - what is the primary small-screen layout?
    - what stacks first?
    - what collapses first?
    - do key actions remain obvious?
    - does the hierarchy still work on narrow screens?
- Do not create desktop-only assumptions in new work.

---

## Bonuts UI Priorities

When deciding what deserves emphasis, prefer:
- recognition moments
- user identity/profile
- social visibility
- badges, status, leaderboard signals
- team activity and appreciation flows

Do not over-emphasize:
- store mechanics
- balance bookkeeping
- administrative controls
- technical integration details

If a UI change makes Bonuts feel more transactional and less recognition-centric, call that out.

---

## Admin and Settings UX

- Reduce cognitive load in admin/settings flows.
- Group settings by user outcome, not by backend implementation details.
- Prefer simple defaults.
- Avoid exposing too many controls at once.
- Admin pages should still feel like product UI, not internal tooling.

---

## Existing System Consistency

Before adding a new component, pattern, or screen behavior, check:
- is there already a similar component?
- is there already a similar settings pattern?
- is there already a token/theme value for this?
- is there already a route or layout solving this problem?

Prefer alignment with existing patterns over inventing a new local pattern.

---

## Cypress

- For responsive UI changes, prefer a reusable viewport-based Cypress pattern instead of testing only one screen size.
- Reuse shared helpers to run the same assertions on desktop and mobile when the behavior should match on both.
- Keep viewport-specific assertions in separate tests or branches only when the behavior is intentionally different.
- For UI changes, test the user-visible behavior, not only implementation details.

---

## Safe Change Behavior

- Make the smallest coherent change that solves the task properly.
- Avoid broad unrelated refactors.
- Do not rename/move files unless it improves the task outcome meaningfully.
- Preserve existing tenant, auth, role, and plugin-related behavior unless the task explicitly changes it.
- Be careful around protected routes, settings flows, and integrations.

---

## What to Call Out Explicitly

Call it out in the response if the task introduces or reveals:
- FSD violations
- design system inconsistencies
- mobile UX regressions
- accessibility concerns
- store-first drift in product emphasis
- unnecessary admin complexity
- unclear recognition/engagement value

---

## Definition of a Good Frontend Change

A good Bonuts frontend change is:
- readable
- consistent
- mobile-aware
- recognition-centric
- visually calm
- aligned with the design system
- low-friction for users
- low-maintenance for the team

If a change is technically correct but makes the product feel colder, heavier, noisier, or more transactional, it is not the best solution.
