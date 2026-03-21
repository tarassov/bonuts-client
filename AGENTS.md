# Codex Task Instructions

## Code Readability

- Prefer the most readable implementation by default.
- It is acceptable to write more code if that makes the logic easier to read and maintain.
- Avoid combining multiple behaviors into a single abstraction when separate explicit branches are easier to understand.
- The only exception is when the more readable version would cause a meaningful performance regression.

## FSD

- Follow Feature-Sliced Design when making changes in this repository.
- Prefer public interfaces for cross-slice imports. For example, import from `@/entities/profile`, not from internal files inside that entity.
- When touching existing code, try to move it closer to FSD-compliant structure instead of adding new violations.
- If you notice an FSD violation that is relevant to the task, call it out explicitly in your response.

## Type Imports

- Import types using `import type` whenever possible.
- If you touch code where types are imported incorrectly, fix those imports as part of the change.

## Cypress

- For responsive UI changes, prefer a reusable viewport-based Cypress pattern instead of testing only one screen size.
- Reuse shared helpers to run the same assertions on desktop and mobile when the behavior should match on both.
- Keep viewport-specific assertions in separate tests or branches only when the behavior is intentionally different.
