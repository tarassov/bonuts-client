# `useHistoryBack` usage guide

`useHistoryBack` helps modal/sheet flows work naturally with browser **Back**.

When mounted, the hook adds a marker history entry (`<originPath>?<key>`). If user presses Back and lands on that marker via `POP`, the hook navigates back to the original pathname and can run an optional callback.

## API

```ts
useHistoryBack({
  key: string;
  callback?: VoidFunction;
  prevent?: boolean;
});
```

- `key` — required marker key that identifies a specific flow.
- `callback` — optional function to run when Back-close interception happens.
- `prevent` — when `true`, enables callback execution on interception.

## Example 1: Close a dialog with browser Back

```tsx
import { useState } from "react";
import { useHistoryBack } from "@/hooks/use-history-back";

export const EmployeeEditDialog = () => {
  const [open, setOpen] = useState(true);

  useHistoryBack({
    key: "employee-edit",
    prevent: true,
    callback: () => setOpen(false),
  });

  if (!open) return null;

  return <div>{/* dialog content */}</div>;
};
```

## Example 2: Marker-only mode (no callback)

```tsx
import { useHistoryBack } from "@/hooks/use-history-back";

export const PluginCreatePage = () => {
  useHistoryBack({ key: "plugin-create" });

  return <div>{/* form */}</div>;
};
```

## Recommendations

- Use stable unique keys per flow (`"employee-edit"`, `"scheduler-create"`, etc.).
- Mount the hook only while modal/back-interception behavior is needed.
- Keep callback side effects focused (e.g. close dialog, reset local flags).
