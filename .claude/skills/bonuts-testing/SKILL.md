---
name: bonuts-testing
description: Test conventions for the Bonuts client — Vitest unit test placement and naming, and the Playwright e2e viewport/behavior patterns. Use when writing or changing unit tests or Playwright specs, or when deciding what to assert for a UI change.
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

## Playwright

Specs live in `e2e/*.spec.ts`. Import `test` and `expect` from `./support/fixtures` so the strict API guard is always active.

```bash
yarn playwright install chromium # first run
yarn e2e                         # starts/stops dev:e2e on :4173
yarn e2e login.spec.ts            # single spec
yarn e2e:ui                      # interactive runner
yarn e2e:typecheck               # check test infrastructure types
yarn e2e:report                  # report and traces
```

Conventions:
- Test **user-visible behavior**, not implementation details.
- For responsive UI changes, use a reusable viewport-based pattern instead of testing a single screen size.
- Reuse shared helpers to run the same assertions on desktop and mobile when behavior should match on both.
- Keep viewport-specific assertions in separate tests or branches only when the behavior is intentionally different.

API mocks:
- Register exact methods and paths with `api.mock("GET", "/events", { body: response })`.
- Shared fixture mocks only the app shell: profile, tenants, current tenant and heartbeat.
- Page helpers explicitly add page endpoints; later registrations override earlier ones.
- Every unmocked `/api/` request aborts the test with method, URL and body. Never add blanket empty responses or forward unknown API requests to a backend.
- Use `api.calls(method, path)` and `expect.poll` to assert requests without racing listeners.
- Use controlled promises for loading tests, releasing them in `finally`.
- Service workers are blocked so they cannot bypass interception.

Details: `docs/playwright-e2e.md`.
