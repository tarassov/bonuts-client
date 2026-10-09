---
name: bonuts-storybook
description: Storybook conventions for the Bonuts client — story file placement, the Layer/Slice/Component title convention that drives sidebar grouping, and preview/main config rules. Use when adding or editing any *.stories.tsx file or changing .storybook config.
---

# Bonuts Storybook

Stories live next to the component they document (`*.stories.tsx` in the same folder). The sidebar is grouped by FSD layer.

## Title convention

- Every story sets an explicit `title` following `Layer/Slice/Component`.
- The first segment is the FSD layer, capitalized: `Shared`, `Entities`, `Features`, `Widgets`, `Pages`, `App`.
- The first segment must match the layer where the component actually lives. Do not invent parallel groups like `Base Elements` or `Base UI Kit`.
- `shared/ui` stories use `Shared/UI/...` (design-system primitives). The kit overview is `Shared/UI Kit/Overview`.
- Optional middle segments group by slice or category: `Shared/UI/Navigation/Breadcrumbs`, `Entities/Event/Event Card`.
- Legacy components still under `src/components` take the title of the layer they belong to **by meaning**, not their physical folder. Example: `src/components/donut/donut-card` → `Entities/Donut/Donut Card`. When the file is later moved into its FSD slice, the title already matches.

## Ordering and config

- Layer order is set once via `options.storySort.order` in `.storybook/preview.tsx`, following FSD dependency direction: `Shared → Entities → Features → Widgets → Pages → App`. New layers appear in this order automatically.
- `.storybook/main.ts` keeps `@mui/icons-material` and other heavy deps in `optimizeDeps.include` so the dev server prebundles them once into cache — **do not remove these entries**.
- When adding a story, follow the title convention; sidebar grouping follows from the `Layer/...` prefix, not from where it feels convenient to put it.

## Run

```bash
yarn storybook         # http://localhost:6006
yarn build-storybook
```
