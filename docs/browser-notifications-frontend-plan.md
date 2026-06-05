# Bonuts Frontend: Browser Notifications Plan

## Task Type
- frontend architecture
- social engagement feature

## What Changed
- Added a frontend implementation plan for browser notifications using full Web Push.
- Scoped the plan around the current Bonuts app structure:
  - Vite PWA and service worker setup in `vite.config.ts`
  - notification settings UI
  - RTK Query API layer
  - FSD-compliant placement for browser notification logic

## Why This Fits Bonuts
- Browser notifications are valuable when they highlight recognition moments, status changes, and meaningful team activity.
- A push-based approach supports visibility and engagement even when the app tab is closed.
- The plan keeps the browser channel separate from existing external integrations so the UX stays clear and low-friction.

## Goal
Implement browser notifications as a user-controlled notification channel. When a user turns the channel on, the frontend should:

1. Request browser permission at the right time.
2. Register a push subscription through a service worker.
3. Persist that subscription on the backend.
4. Handle incoming push events and notification clicks.
5. Keep UI state accurate across permission changes, auth changes, and tenant changes.

Backend responsibility is assumed for:
- storing subscriptions
- deciding when to send notifications
- sending Web Push payloads only when the user enabled the channel

## Product Rules

### What Browser Notifications Should Cover
- recognition received
- teammate appreciation and mentions
- meaningful status or badge moments
- other socially relevant activity with clear user value

### What They Should Not Drift Into
- admin-only reminders
- bookkeeping or store-first prompts
- technical integration noise
- low-value repeated system messages

## Recommended Frontend Scope

### In Scope
- browser capability detection
- permission flow
- service worker registration integration
- push subscription creation and removal
- backend sync for subscription state
- settings UI for browser notifications
- click-through routing from notifications into the app
- local state reconciliation when permission is revoked outside the app

### Out of Scope
- backend push sending logic
- server-side notification eligibility rules
- broad refactors outside notification-related areas

## Architecture Overview

### User Flow
1. User opens notification settings.
2. User enables the Browser Notifications channel.
3. Frontend checks support:
   - `serviceWorker` support
   - `PushManager` support
   - `Notification` support
   - secure context
4. Frontend requests notification permission only after explicit user action.
5. If permission is granted:
   - register or reuse service worker
   - create `PushSubscription`
   - send subscription to backend
   - mark browser notification channel as enabled in UI
6. If permission is denied:
   - keep channel disabled
   - show localized recovery guidance
7. When backend sends a push:
   - service worker receives `push`
   - service worker shows notification
8. When user clicks notification:
   - service worker focuses an existing Bonuts tab or opens one
   - app routes user to the relevant recognition/activity target

## Frontend Slice Placement

Follow FSD without introducing cross-slice leakage.

### `shared`
Use `shared` for browser/platform primitives and service worker integration.

Suggested areas:
- `src/shared/lib/browser-notifications/`
  - support checks
  - permission helpers
  - payload parsing helpers
- `src/shared/model/browser-notifications/`
  - subscription registration logic
  - sync/reconciliation logic
  - service worker messaging helpers if needed

### `entities`
Use `entities` for notification-domain data contracts if the backend exposes browser notification channel state as a profile or notification entity concept.

Possible area:
- `src/entities/profile/`
- or a dedicated `src/entities/notification/` only if the domain becomes large enough

### `features`
Use `features` for user-triggered enable/disable flow and settings interaction.

Suggested area:
- `src/features/browser-notifications/`
  - activate flow
  - deactivate flow
  - permission/error messaging
  - reconciliation actions

### `widgets`
Use `widgets` only for page/settings composition around the feature.

## Suggested File-Level Plan

### Service Worker
- Add or extend a service worker entry that handles:
  - `push`
  - `notificationclick`
- Keep push presentation logic inside the service worker, not in React components.

Possible targets:
- PWA/service worker files wired through [vite.config.ts](/home/alex/bonuts/bonuts-client/vite.config.ts)

### Shared Browser Notification Module
Create a small browser notification module with explicit responsibilities:

- `isBrowserNotificationsSupported`
- `getBrowserNotificationPermission`
- `requestBrowserNotificationPermission`
- `registerPushSubscription`
- `unregisterPushSubscription`
- `getExistingPushSubscription`

Keep browser API handling out of settings components.

### Feature Flow
Create feature-level orchestration for:
- enable browser notifications
- disable browser notifications
- recover from denied permission
- recover from stale backend subscription

### Settings UI
Extend the current notification settings UI to show a browser channel alongside existing channels.

Likely touchpoints:
- [src/widgets/integration-settings/ui/notification-item.tsx](/home/alex/bonuts/bonuts-client/src/widgets/integration-settings/ui/notification-item.tsx)

The browser channel should display:
- supported / unsupported
- permission required
- blocked in browser
- enabled
- syncing

Do not overload external integration cards with browser-specific connection semantics. If needed, use a dedicated browser notification settings row rather than pretending the browser is just another plugin integration.

## API Contract Assumptions
Frontend implementation will be simplest if backend provides dedicated endpoints for browser subscription lifecycle.

Recommended frontend-facing operations:
1. `GET` current browser notification state for current user and tenant
2. `POST` or `PUT` register/update push subscription
3. `DELETE` remove push subscription
4. optional explicit enable/disable endpoint if subscription persistence and user preference are separate

Recommended payload fields from frontend to backend:
- tenant
- subscription endpoint
- subscription keys
- browser channel enabled flag if required by backend contract
- optional client metadata:
  - user agent
  - locale
  - app version

Recommended payload fields from backend to frontend:
- `isEnabled`
- `isSupportedByBackend`
- `hasSubscription`
- optional last sync timestamp

### Recommended Endpoints
These are recommended contracts for frontend/backend alignment. They are examples, not existing generated API methods in this repository.

#### Option 1: Explicit Browser Notification Endpoints
This is the clearest option for frontend implementation.

1. `GET /profile/notifications/browser?tenant={tenantId}`
2. `POST /profile/notifications/browser/subscribe`
3. `POST /profile/notifications/browser/unsubscribe`
4. optional `POST /profile/notifications/browser/enable`
5. optional `POST /profile/notifications/browser/disable`

Use this model if backend wants browser notifications to be a first-class channel, separate from plugin notifications.

#### Option 2: Reuse Existing Profile Notification Semantics
If backend wants to stay closer to current notification preference patterns, it can expose browser notifications as a channel in the profile notification list and add dedicated subscription endpoints next to that.

Example:
1. `GET /profile/notifications?tenant={tenantId}`
2. `POST /profile/notifications/browser/subscribe`
3. `DELETE /profile/notifications/browser/subscription`

Use this model only if the preference model and subscription model stay clearly separated. A browser push subscription is not the same thing as a user preference toggle.

### Example Queries

#### 1. Get Current Browser Notification State
Use this when the settings screen loads.

```http
GET /profile/notifications/browser?tenant=acme
Authorization: Bearer <token>
```

Example response:

```json
{
  "data": {
    "channel": "browser",
    "tenant": "acme",
    "isEnabled": true,
    "hasSubscription": true,
    "permission": "granted",
    "isSupportedByBackend": true,
    "subscriptionId": "sub_01JXYZ",
    "lastSyncedAt": "2026-06-06T08:42:13Z"
  }
}
```

Notes:
- `permission` is frontend-derived in practice, because backend cannot fully trust browser runtime permission state.
- If backend does not want to return `permission`, frontend should still compute it locally.

#### 2. Register or Update a Push Subscription
Use this after:
- user enables browser notifications
- permission is granted
- frontend creates or refreshes a `PushSubscription`

```http
POST /profile/notifications/browser/subscribe
Authorization: Bearer <token>
Content-Type: application/json
```

Example request:

```json
{
  "tenant": "acme",
  "enabled": true,
  "subscription": {
    "endpoint": "https://fcm.googleapis.com/fcm/send/abc123...",
    "expirationTime": null,
    "keys": {
      "p256dh": "BNc...clientPublicKey",
      "auth": "xyz...authSecret"
    }
  },
  "client": {
    "locale": "en",
    "userAgent": "Mozilla/5.0 ...",
    "appVersion": "web-2026-06-06"
  }
}
```

Example response:

```json
{
  "data": {
    "channel": "browser",
    "tenant": "acme",
    "isEnabled": true,
    "hasSubscription": true,
    "subscriptionId": "sub_01JXYZ",
    "lastSyncedAt": "2026-06-06T08:45:02Z"
  }
}
```

Frontend notes:
- The payload should use `subscription.toJSON()` shape where possible.
- If backend stores subscriptions idempotently by endpoint, repeated subscribe calls are acceptable and simplify reconciliation.

#### 3. Disable Browser Notifications But Keep Subscription Logic Explicit
There are two valid models here. Backend should choose one.

Model A: disable means unsubscribe and remove backend association.

```http
POST /profile/notifications/browser/unsubscribe
Authorization: Bearer <token>
Content-Type: application/json
```

Example request:

```json
{
  "tenant": "acme",
  "endpoint": "https://fcm.googleapis.com/fcm/send/abc123..."
}
```

Example response:

```json
{
  "data": {
    "channel": "browser",
    "tenant": "acme",
    "isEnabled": false,
    "hasSubscription": false
  }
}
```

Model B: disable means keep subscription record but mute delivery.

```http
POST /profile/notifications/browser/disable
Authorization: Bearer <token>
Content-Type: application/json
```

Example request:

```json
{
  "tenant": "acme"
}
```

Example response:

```json
{
  "data": {
    "channel": "browser",
    "tenant": "acme",
    "isEnabled": false,
    "hasSubscription": true
  }
}
```

Recommendation:
- Prefer Model A if you want simpler reasoning and fewer stale subscriptions.
- Prefer Model B only if backend has a strong reason to preserve subscriptions while delivery is muted.

#### 4. Re-enable Using Existing Subscription
If the browser still has a valid local subscription, frontend can skip creating a new one and resync the existing subscription instead.

```http
POST /profile/notifications/browser/enable
Authorization: Bearer <token>
Content-Type: application/json
```

Example request:

```json
{
  "tenant": "acme",
  "subscription": {
    "endpoint": "https://fcm.googleapis.com/fcm/send/abc123...",
    "expirationTime": null,
    "keys": {
      "p256dh": "BNc...clientPublicKey",
      "auth": "xyz...authSecret"
    }
  }
}
```

Example response:

```json
{
  "data": {
    "channel": "browser",
    "tenant": "acme",
    "isEnabled": true,
    "hasSubscription": true,
    "subscriptionId": "sub_01JXYZ"
  }
}
```

#### 5. Remove Subscription on Logout or Tenant Switch
If frontend decides to clean up server association aggressively, it can call unsubscribe during logout or tenant change.

```http
POST /profile/notifications/browser/unsubscribe
Authorization: Bearer <token>
Content-Type: application/json
```

Example request:

```json
{
  "tenant": "acme",
  "endpoint": "https://fcm.googleapis.com/fcm/send/abc123..."
}
```

This should be treated as best-effort cleanup, not a blocking logout action.

### Example Frontend Sequence

#### Enable Flow
1. `GET /profile/notifications/browser?tenant=acme`
2. Frontend checks:
   - browser support
   - `Notification.permission`
   - existing `PushSubscription`
3. If permission is not granted, call `Notification.requestPermission()`
4. Register service worker if needed
5. Call `registration.pushManager.subscribe(...)` or reuse existing subscription
6. `POST /profile/notifications/browser/subscribe`
7. Refresh local UI state

#### Disable Flow
1. Read existing local subscription
2. Call backend disable or unsubscribe endpoint
3. Optionally call `subscription.unsubscribe()` locally
4. Refresh local UI state

#### Settings Screen Load
1. `GET /profile/notifications/browser?tenant=acme`
2. Read local browser permission
3. Read local `PushSubscription`
4. Reconcile mismatch:
   - backend enabled, local subscription missing
   - backend enabled, permission denied
   - backend disabled, local subscription still exists

### Example RTK Query Shapes
The project uses RTK Query, so the browser notification contract should be easy to model explicitly.

Example endpoint shapes:

```ts
type TBrowserNotificationState = {
  channel: "browser";
  tenant: string;
  isEnabled: boolean;
  hasSubscription: boolean;
  isSupportedByBackend: boolean;
  subscriptionId?: string;
  lastSyncedAt?: string;
};

type TPushSubscriptionPayload = {
  endpoint: string;
  expirationTime: number | null;
  keys: {
    p256dh: string;
    auth: string;
  };
};
```

Example mutation payloads:

```ts
type TSubscribeBrowserNotificationsArg = {
  tenant: string;
  enabled: boolean;
  subscription: TPushSubscriptionPayload;
  client?: {
    locale?: string;
    userAgent?: string;
    appVersion?: string;
  };
};

type TUnsubscribeBrowserNotificationsArg = {
  tenant: string;
  endpoint: string;
};
```

### Query Design Recommendations
- Make subscribe requests idempotent.
- Avoid requiring frontend to know a server-generated subscription ID before unsubscribe if endpoint-based lookup is possible.
- Return enough state in each response so frontend does not need immediate extra refetches.
- Keep subscription persistence separate from notification content delivery rules.
- Do not rely on frontend-provided permission state as the source of truth for send eligibility.

## State Model

Frontend should distinguish these states explicitly:
- unsupported
- default permission
- granted permission without subscription
- granted permission with active subscription
- denied permission
- syncing
- backend-enabled but local subscription missing
- backend-disabled

This should not be collapsed into a single boolean. The UI and recovery logic need clearer state than `true/false`.

## Service Worker Responsibilities

### `push` Event
- parse payload safely
- validate minimum fields
- show a notification with:
  - title
  - body
  - icon or badge if available
  - `data` for routing target

### `notificationclick` Event
- close the notification
- focus an existing client if one exists
- otherwise open a new app window
- route to a relevant in-app target using payload data

### Payload Expectations
Recommended payload fields:
- `type`
- `title`
- `body`
- `targetUrl`
- `eventId` or equivalent stable ID
- optional image/icon/badge

## UI/UX Plan

### Settings Entry
Prefer a dedicated Browser Notifications row in the existing settings area.

The row should include:
- channel name
- short value-focused description
- current state label
- enable/disable control
- recovery hint when permission is denied

### Permission Prompt Timing
- Never request permission on page load.
- Only request permission after user intent:
  - toggling the switch on
  - clicking an enable CTA

### Recovery UX
If permission was denied:
- show that browser notifications are blocked
- explain that the user must re-enable them in browser settings
- keep copy short and localized

### Mobile-First Implications
- keep the browser notification settings row readable on small screens
- avoid long technical helper text in the primary layout
- ensure the main action remains obvious without horizontal crowding
- test support/unsupported/denied states at narrow widths

### Styling Approach
- use existing settings composition patterns first
- use CSS Modules for layout if the settings section needs structural changes
- use `styled()` only for reusable browser-notification-specific primitives
- use `sx` only for very small local tweaks

## Routing and Deep Linking

Notification clicks should resolve to clear in-app destinations.

Preferred targets:
- recognition event detail
- activity feed anchored to event
- profile page when profile-centric

Routing rules:
- if an app tab is already open, focus it
- if possible, navigate within the existing client
- otherwise open the target route directly

## Error and Reconciliation Cases

Frontend should handle:
1. Permission granted, subscription creation fails
2. Subscription exists locally, backend save fails
3. Backend says enabled, local subscription is missing
4. Permission was revoked outside the app
5. User logs out or switches tenant
6. Service worker updates and subscription needs refresh

Recommended behavior:
- fail closed rather than pretending browser notifications are enabled
- show localized error feedback
- re-check actual browser/subscription state on settings load

## Auth and Tenant Considerations
- Treat push subscription sync as tenant-aware if backend notification rules are tenant-scoped.
- On logout:
  - decide whether to unregister subscription locally or only remove backend association
- On tenant switch:
  - re-sync browser subscription against the active tenant

The frontend plan should not assume one subscription maps cleanly to one tenant unless backend confirms that model.

## Security and Environment Requirements
- Web Push requires secure context.
- Production must run over HTTPS.
- Local development should use the current secure dev setup where possible.

The frontend should guard against unsupported environments and avoid showing a broken enable flow.

## Rollout Plan

### Phase 1: Data Contract and UI Skeleton
1. Confirm backend contract and payload shape.
2. Add browser notification state to the frontend API layer.
3. Add settings UI shell with support-state rendering.
4. Add localized copy for all states.

### Phase 2: Permission and Subscription Flow
1. Implement browser support detection.
2. Implement permission request flow.
3. Implement service worker registration integration.
4. Implement create/delete subscription calls to backend.
5. Handle optimistic and failure states carefully.

### Phase 3: Push Handling
1. Implement service worker `push` handling.
2. Implement `notificationclick` routing behavior.
3. Validate payload parsing and fallback behavior.

### Phase 4: Reconciliation and Hardening
1. Re-check local permission/subscription state on settings load.
2. Handle tenant and auth transitions.
3. Handle revoked permission and stale backend state.
4. Add analytics if needed for enable/deny/click flows.

### Phase 5: QA
1. Desktop browser validation
2. Mobile browser validation
3. Unsupported browser validation
4. Denied-permission recovery validation
5. Notification click routing validation

## Testing Plan

### Unit / Integration
- support detection helpers
- permission state mapping
- payload-to-route mapping
- enable/disable flow behavior

### Manual / E2E
- enable flow from default permission
- denied permission flow
- disable flow
- service worker click behavior
- tenant-switch reconciliation

If Cypress covers this flow later, prefer viewport-based reuse across desktop and mobile where behavior should match.

## Risks and Tradeoffs
- Service worker logic is easy to get wrong and harder to debug than regular React UI.
- Browser support is uneven, especially across mobile browsers.
- Permission prompt timing can damage opt-in rates if handled poorly.
- Mixing browser channel logic into plugin integration UI could create domain confusion.

## Validation Steps
1. Confirm backend API contract and tenant model.
2. Confirm notification payload schema.
3. Confirm target routes for click-through behavior.
4. Implement the settings row and state model first.
5. Implement service worker and subscription sync second.
6. Validate manually in at least one Chromium browser before broader rollout.

## Files Affected
- [vite.config.ts](/home/alex/bonuts/bonuts-client/vite.config.ts)
- [src/widgets/integration-settings/ui/notification-item.tsx](/home/alex/bonuts/bonuts-client/src/widgets/integration-settings/ui/notification-item.tsx)
- [src/entities/profile/api/profiles-api.ts](/home/alex/bonuts/bonuts-client/src/entities/profile/api/profiles-api.ts)
- new browser notification files under `src/shared/*`
- new feature files under `src/features/browser-notifications/*`
- service worker source file(s)

## FSD and Design Notes To Watch
- Do not place browser platform helpers inside widget or page components.
- Do not model the browser channel as a generic plugin if its behavior is materially different.
- Keep user-facing copy recognition-centric and not overly technical.
- Keep settings UX calm and lightweight so the feature feels like product functionality, not infrastructure exposure.
