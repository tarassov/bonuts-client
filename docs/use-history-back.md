# `useHistoryBack`

`useHistoryBack` lets a UI flow consume one browser **Back** action without changing the visible URL.

When enabled, the hook pushes a history marker that preserves the current pathname, query, hash, and location state. A subsequent `POP` from that marker invokes `callback`. When the component unmounts for another reason, the hook removes its marker.

## API

```ts
useHistoryBack({
  callback: VoidFunction,
  enabled: boolean,
  key: string,
});
```

The dialog infrastructure uses the hook automatically. Prefer enabling it through dialog configuration instead of calling it from a feature:

```tsx
const modalConfig = {
  items: {
    CreateDonut: {
      renderItem: (_, props) => <ModalCreateDonut {...props} />,
      closeOnBack: true,
    },
  },
};
```

`closeOnBack` applies only to dialogs without `getPath`. Route-backed dialogs already close when browser history returns to their background route.

The hook lives in `shared/lib/modal`, while its integration with configured dialogs lives in `shared/ui/dialog`.
