---
name: bonuts-testing
description: Test conventions for the Bonuts client — Vitest unit test placement and naming, and the Cypress e2e viewport/behavior patterns. Use when writing or changing unit tests or Cypress specs, or when deciding what to assert for a UI change.
---

# Bonuts Testing

## Vitest

- Runner: Vitest with jsdom. Coverage configured as text/json/html.
- Place tests colocated next to the code, or in `__tests__` next to the feature. Name them `*.test.ts(x)`.
- Keep coverage meaningful around business logic rather than chasing a number.

```bash
yarn test               # watch
yarn test:withoutWatch  # single run, CI-friendly
```

## Cypress

Specs live in `cypress/e2e/*.cy.ts`.

```bash
yarn cypress:run        # boots yarn dev:e2e on :4173, runs all specs, tears down
yarn cypress:run:login  # single spec
yarn cypress:open       # interactive; start `yarn dev:e2e` in another terminal first
```

Conventions:
- Test **user-visible behavior**, not implementation details.
- For responsive UI changes, use a reusable viewport-based pattern instead of testing a single screen size.
- Reuse shared helpers to run the same assertions on desktop and mobile when behavior should match on both.
- Keep viewport-specific assertions in separate tests or branches only when the behavior is intentionally different.

Performance and structure background: `docs/cypress-optimization-plan.md`.
