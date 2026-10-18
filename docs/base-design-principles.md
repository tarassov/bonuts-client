# Base Design Principles

This document captures a minimal visual foundation that can be reused across projects.
It is intentionally product-agnostic so it can be applied to web UI, admin panels, transactional pages, and backend-rendered mailers.

## Core Intent

Design should feel:
- clear
- warm
- calm
- trustworthy
- human

Design should avoid feeling:
- cold
- overloaded
- overly corporate
- visually noisy
- mechanically transactional

## Base Color System

Use a small palette with clear roles. Start here before introducing product-specific accent colors.

### Primary Colors

- `base-900`: `#1F2A37`
  Main text, strong headings, high-contrast UI anchors.
- `base-700`: `#3C4A5B`
  Secondary headings, icons, stronger supporting text.
- `base-500`: `#6B7280`
  Secondary text, labels, helper copy.
- `base-300`: `#D5DCE5`
  Borders, dividers, input outlines.
- `base-100`: `#F5F7FA`
  Subtle backgrounds, muted sections.
- `base-0`: `#FFFFFF`
  Main surface color.

### Accent Colors

- `accent-primary`: `#FF7A59`
  Primary actions, highlights, active emphasis.
- `accent-primary-hover`: `#E76647`
  Hover and pressed state for the primary accent.
- `accent-soft`: `#FFF1EC`
  Soft tinted backgrounds behind emphasis blocks or badges.

### Semantic Colors

- `success`: `#2E9B6F`
- `success-soft`: `#EAF7F1`
- `warning`: `#D98E04`
- `warning-soft`: `#FFF6E3`
- `error`: `#D64545`
- `error-soft`: `#FDECEC`
- `info`: `#3D7EF0`
- `info-soft`: `#ECF3FF`

## Color Usage Rules

- Use dark neutrals for text before using pure black.
- Keep primary surfaces light by default.
- Reserve accent color for actions, status emphasis, and key highlights.
- Do not place accent color on large backgrounds unless the content is intentionally promotional.
- Prefer tinted semantic backgrounds over saturated full-color panels.
- Borders should stay quiet and structural, not decorative.

## Contrast Rules

- Body text must remain easy to read on first glance.
- Secondary text should still be readable without strain.
- Button text and links must maintain clear contrast in all states.
- In mailers, prioritize readability over visual subtlety because rendering varies across clients.

## Typography Principles

- Use one primary sans-serif family across the system.
- Prefer clear hierarchy over decorative typography.
- Headings should feel stable and compact, not oversized.
- Body copy should use comfortable line height.
- Limit the number of text styles; fewer roles make reuse easier.

Recommended roles:
- `heading-lg`: primary title
- `heading-md`: section title
- `body-md`: default paragraph text
- `body-sm`: supporting text
- `label-sm`: labels, metadata, captions

## Spacing Principles

Use a predictable spacing rhythm. A `4px` base scale is usually enough.

Recommended scale:
- `4px`
- `8px`
- `12px`
- `16px`
- `24px`
- `32px`
- `40px`

Rules:
- Use tighter spacing inside components.
- Use larger spacing between sections.
- Do not create near-duplicate spacing values unless there is a real layout reason.

## Surface Principles

- Main content should sit on clean, simple surfaces.
- Use subtle borders before shadows.
- If shadows are used, keep them soft and shallow.
- Rounded corners should feel friendly but restrained.
- Prefer one dominant surface style across a screen or mailer.

Recommended defaults:
- border radius: `12px`
- standard border: `1px solid #D5DCE5`
- card background: `#FFFFFF`
- page background: `#F5F7FA`

## Action Principles

- One screen or section should have one obvious primary action.
- Secondary actions should be visible but quieter.
- Destructive actions must never compete visually with the primary action.
- Interactive states should change clearly on hover, focus, and disabled.

## Content Principles

- Put the most important message first.
- Reduce administrative or technical phrasing when plain language works.
- Keep labels explicit.
- Prefer short sentences in UI and mailers.
- If a user needs to act, state the action directly.

## Layout Principles

- Build from mobile-first constraints even if the first output is desktop or email.
- Keep the main reading path obvious.
- Group related information into clear sections.
- Avoid dense multi-column layouts unless the content truly benefits from comparison.
- In mailers, a single-column structure is the safest default.

## Mailer-Specific Notes

When exporting these principles to backend-rendered email templates:
- Use the same neutral text and surface colors.
- Keep backgrounds simple; many mail clients render complex layers poorly.
- Use accent color mainly for CTA buttons and small highlights.
- Avoid relying on subtle borders alone to separate sections; combine spacing and background contrast.
- Keep maximum content width conservative, usually around `560px` to `640px`.
- Prefer large tap targets and generous spacing for CTA blocks.

## Minimal Starter Tokens

```json
{
  "color": {
    "textPrimary": "#1F2A37",
    "textSecondary": "#6B7280",
    "border": "#D5DCE5",
    "surface": "#FFFFFF",
    "surfaceMuted": "#F5F7FA",
    "accent": "#FF7A59",
    "accentHover": "#E76647",
    "accentSoft": "#FFF1EC",
    "success": "#2E9B6F",
    "warning": "#D98E04",
    "error": "#D64545",
    "info": "#3D7EF0"
  },
  "radius": {
    "md": "12px"
  },
  "spacing": {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "6": "24px",
    "8": "32px"
  }
}
```

## Reuse Rule

If a new project needs more visual personality, keep these foundations stable first:
- neutral text colors
- light surfaces
- one primary accent
- clear spacing rhythm
- restrained borders and shadows

Add brand-specific expression only after those basics remain coherent.
