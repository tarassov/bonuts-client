---
name: bonuts-client-workflow
description: Use this skill when working on the Bonuts frontend (feature changes, bug fixes, API wiring, localization, routing, or tests) in the bonuts-client repository.
---

# Bonuts Client Workflow

Use this skill for requests like:
- "Fix a bug in Bonuts UI"
- "Add a new Bonuts page or form"
- "Wire a new backend endpoint in Bonuts"
- "Update Bonuts translations"

## Quick project map

- App shell/provider composition: `src/components/app/app.tsx`
- Entry + Redux provider: `src/index.tsx`
- Redux store/history: `src/services/redux/store/store.ts`
- RTK Query base API: `src/services/api/empty-api.ts`
- OpenAPI-generated endpoints: `src/services/api/bonuts-api.ts`
- Manual API overrides/enhancements: `src/services/api/injected-api.ts`
- Route config/menu building: `src/routes/config/routes-config.ts`, `src/routes/get-menu-routes.ts`
- Localized text dictionaries: `src/services/localization/texts/`
- Shared reusable UI primitives: `src/shared/`
- Feature/page implementations: `src/pages/`, `src/components/`, `src/features/`

For deeper conventions and checklists, read `references/bonuts-implementation-guide.md`.

## Standard execution flow

1. **Locate the vertical slice**
   - Start from route/page, then identify dependent API hooks/selectors/components.
2. **Prefer existing Bonuts primitives**
   - Reuse `src/shared/*` inputs, buttons, cards, table helpers, and modal/loader providers before creating new primitives.
3. **API work pattern**
   - If endpoint already exists in `bonuts-api.ts`, consume generated hook.
   - If endpoint is missing and OpenAPI has it, run `yarn generate-api`.
   - For multipart or custom behavior, add overrides in `injected-api.ts`.
   - If generated API lacks desired `providesTags`/`invalidatesTags`, add tags manually via `bonutsApi.enhanceEndpoints(...)` in custom API layer code.
4. **Localization first**
   - Add/adjust translation keys in `src/services/localization/texts/*` instead of hardcoded UI strings.
5. **FSD migration awareness**
   - Bonuts is migrating to FSD; place new code in FSD-friendly boundaries and avoid increasing legacy cross-layer coupling.
   - In FSD code, import across slices only through public APIs such as `@/shared` or `@/entity`; use relative imports only for internal imports within the same slice.
6. **Validate changes**
   - Run targeted tests first, then `yarn test:withoutWatch` for broader coverage when practical.
   - Run `yarn lint` for type/lint safety before finalizing.

## Guardrails

- Treat `bonuts-api.ts` as OpenAPI-generated output; avoid manual edits in generated sections.
- In FSD modules, import other slices via their public API (for example `@/shared` or `@/entity`), and use relative imports only inside one slice.
- Keep auth-aware API behavior in `empty-api.ts` patterns (`Authorization` header, `credentials: include`).
- Preserve existing store composition and middleware stack in `store.ts`.
- Follow existing naming/style in nearby files; avoid introducing alternate architectural patterns.
