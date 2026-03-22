# Bonuts implementation guide

## 1) Architecture essentials

- React 18 + Vite + TypeScript app.
- State and server cache use Redux Toolkit + RTK Query.
- Routing uses `redux-first-history` (`HistoryRouter` in `App`).
- Theme, locale, snackbar, loading, and app context providers are composed in `src/components/app/app.tsx`.
- Bonuts is migrating to FSD; prefer changes that move toward clearer feature/entity/shared boundaries.
- In FSD code, cross-slice imports should go through public APIs such as `@/shared` or `@/entity`; use relative imports only for modules inside the same slice.

## 2) Domain model clues in this codebase

Bonuts frontend centers around tenants, profiles, donuts, circles, events, invitations, requests, ties, scheduler, and account operations (visible in generated API endpoints and page folders).

When implementing behavior, find the matching API adapter and page module first:
- API layer: `src/services/api/extended/*`, `src/services/api/bonuts-api.ts`, `src/services/api/injected-api.ts`
- Data mapping: `src/services/adaptor/*`
- UI pages/features: `src/pages/*`, `src/features/*`

## 3) Practical change recipes

### Add a new API-backed UI action

1. Check for existing endpoint hook in `bonuts-api.ts`.
2. If absent, regenerate API from OpenAPI using `yarn generate-api`.
3. If request format is special (e.g., `FormData`), add an override in `injected-api.ts`.
4. If generated endpoints need caching tags, add them manually with `bonutsApi.enhanceEndpoints(...)` (do not patch generated blocks directly).
5. Consume hook in target component/page and keep request/response adaptation in adaptor files.

### Add a new page behavior

1. Update relevant route config in `src/routes/config/routes-config.ts`.
2. Add/modify page component in `src/pages/<page-name>/`.
3. Reuse shared components from `src/shared/`.
4. Add localization keys and use translation hooks instead of literals.
5. When feasible, implement in a way that supports ongoing FSD migration (reduce coupling and keep boundaries explicit).
6. In FSD areas, import from other slices only through public APIs like `@/shared` or `@/entity`; keep relative imports internal to a single slice.

### Add or update localized text

1. Add key in correct file under `src/services/localization/texts/`.
2. Ensure key is available through locale setup (`en`/`ru` dictionaries).
3. Replace hardcoded UI text with localization key usage.

## 4) Validation checklist

Run this default sequence:

1. `yarn test:withoutWatch`
2. `yarn lint`
3. `yarn build`

If time is limited, at minimum run checks relevant to touched files and note limitations.
