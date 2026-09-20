---
name: bonuts-i18n
description: Localization rules for the Bonuts client — no hardcoded user-facing strings, the useBntTranslate hook, and how to pick the right texts_* enum bucket in src/services/localization/texts. Use whenever adding or editing any user-visible copy: labels, buttons, helper text, validation messages, empty states, errors.
---

# Bonuts Localization

The app uses i18next through the `useBntTranslate` hook. Keys are enums in `src/services/localization/texts/texts_<letter>.ts`, one enum per letter, re-exported from the `texts` barrel. Locales: `ru`, `en`, `kk`.

## Rules

- Do not leave new user-facing strings hardcoded in components.
- Localize button labels, helper text, validation messages, empty states, and error/fallback copy.
- If you touch a component with hardcoded user-facing strings, fix those strings as part of the change when practical.
- Keep a key in the `texts_*` enum matching the **first meaningful letter of the phrase or concept**.
- Do not add unrelated keys to `texts_v` (or any other bucket) just because it is already imported nearby.

## Usage

```tsx
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_a } from "@/services/localization/texts";

const { t } = useBntTranslate();

t(texts_a.add_new_scheduler, { capitalize: true });
```

Import the enums from the `@/services/localization/texts` barrel, not from a `texts_<letter>` file directly. (Many files still use the legacy bare `services/localization/texts` and `hooks/use-bnt-translate` forms — use the `@/` form in new code; see the `bonuts-fsd` skill.)

## Adding a key

1. Determine the first meaningful letter of the phrase or concept.
2. Add the key to the enum in `src/services/localization/texts/texts_<letter>.ts`. The enum value is the lowercase English phrase used as the i18n key.
3. Add the translation in each locale file: `ru/ru-locale.ts`, `en/en-locale.ts`, `kk/kk-locale.ts`.
4. Reference the key through `t(...)` — never inline the literal.
