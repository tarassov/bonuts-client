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

## Detailed Rules Live in Skills

Technical conventions are not repeated here. Load the matching skill before doing that kind of work:

| Skill | Load it when |
|---|---|
| `bonuts-fsd` | creating/moving/renaming files, choosing a layer or slice, import-path questions, FSD violations |
| `bonuts-styling` | any component styling, CSS Modules vs `styled()` vs `sx`, design tokens, style review |
| `bonuts-typescript` | declaring types, RTK Query endpoints and cache tags, generated API |
| `bonuts-i18n` | any user-facing string |
| `bonuts-dev-runbook` | running, checking, building, deploying, API codegen, env vars, git/PR flow |
| `bonuts-storybook` | adding or editing `*.stories.tsx` |
| `bonuts-testing` | Vitest unit tests, Cypress specs |

If a rule in `README.md`, `.junie/guidelines.md`, or `docs/` contradicts a skill, the skill wins — those files are older and partly stale.

---

# Bonuts — Product Context

## What is Bonuts

**Bonuts** is a SaaS platform for peer-to-peer employee recognition and engagement, primarily designed for small and medium-sized companies.

The core mechanic is simple:

1. Employees periodically receive a limited number of virtual **donuts**.
2. They give donuts to colleagues together with a message of appreciation.
3. These interactions appear in a shared social feed and become visible recognition of people's contributions.
4. Received donuts can be converted into points and may be used for rewards configured by the company.

However, **Bonuts is not primarily a rewards store or a virtual currency system**.

The main product value is **social recognition**: helping employees notice, acknowledge, and appreciate each other's contributions.

The product should encourage a company culture where recognition happens naturally between employees rather than being driven manually by HR.

## Product Philosophy

Bonuts is built around the idea:

> Culture is in how we see each other.
> We see more than we're used to saying.
> Bonuts helps us say it.

Therefore, when making product, UX, design, or technical decisions, prioritize:

**recognition → people → social interaction → engagement → status**

over:

**balances → transactions → rewards → administration**

The shared recognition feed, employee profiles, reactions, achievements, badges, rankings, and other social mechanics should make recognition visible and reinforce positive behavior inside the company.

Gamification should **support recognition**, not turn Bonuts into a competition for points.

## Target Product

Bonuts is intended to become a **self-service, multi-tenant SaaS product** for SMB companies, primarily teams of approximately **30–300 employees**.

The system should scale without requiring constant manual activity from HR or the Bonuts team.

Physical rewards and their logistics are managed by customer companies. Bonuts provides the software infrastructure and should not depend on physical reward fulfillment as its core value proposition.

## Product Experience

Bonuts should feel like:

**modern SaaS + light gamification + warm human interaction**

It should **not** feel like:

* accounting software;
* an HR administration system;
* a CRM;
* a transaction ledger;
* a corporate rewards catalog.

When implementing new features, prefer solutions that make Bonuts feel more:

* human;
* social;
* lightweight;
* positive;
* engaging.

## Core Product Principle

When there is a conflict between emphasizing **people and recognition** versus emphasizing **points, balances, rewards, or administrative mechanics**, prefer **people and recognition**.

Bonuts is ultimately a tool for building a **culture of noticing people and expressing appreciation**.

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

## Admin and Settings UX

- Reduce cognitive load in admin/settings flows.
- Group settings by user outcome, not by backend implementation details.
- Prefer simple defaults.
- Avoid exposing too many controls at once.
- Admin pages should still feel like product UI, not internal tooling.

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
- Prefer less imperative code for status, label, class, and presenter selection: use typed mapping objects or lookup tables when they make branches clearer and keep localization keys close to the mapped UI state.
- Prefer named callback methods over inline event handlers when the handler contains non-trivial logic or is reused.
- Prefer an empty line before `return` when it improves visual separation after preceding logic.
- Prefer one component per file as a general rule. Small internal helpers are acceptable only when extraction would clearly hurt readability.
- Use this heuristic: if a file grows beyond 10 lines, treat it as likely needing refactor and check whether logic or styling should be extracted.
- Move non-UI helpers (sorting, mapping, formatting, ranking, presenter-style transformations) out of component files into dedicated helper/presenter files (for example `LeaderboardHelper.ts`) and export the required methods from there.

---

## Existing System Consistency

Before adding a new component, pattern, or screen behavior, check:
- is there already a similar component?
- is there already a similar settings pattern?
- is there already a token/theme value for this?
- is there already a route or layout solving this problem?

Prefer alignment with existing patterns over inventing a new local pattern.

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
