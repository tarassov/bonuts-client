import type { TDialogItem } from "./dialog-types";

/**
 * Declares a modal for the dialog config.
 * The payload and result types given here are what `useModal().SomeModal.show()` and its result are typed with.
 */
export const defineModal = <TData = void, TResult = void>(item: TDialogItem<TData, TResult>) => item;
