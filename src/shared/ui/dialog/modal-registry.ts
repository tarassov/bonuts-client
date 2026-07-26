import type { TModalPayloadOf, TModalResultOf } from "./dialog-types";

/**
 * Registry of the application modals, filled in by the app layer with its own config:
 *
 * ```ts
 * declare module "@/shared/ui/dialog/modal-registry" {
 *     interface BntModalRegistry extends TModalItems {}
 * }
 * ```
 *
 * It is what makes `useModal()` typed in every layer without shared importing app modules.
 */
// biome-ignore lint/suspicious/noEmptyInterface: the app fills it in through module augmentation
export interface BntModalRegistry {}

export type TModalName = Extract<keyof BntModalRegistry, string>;

export type TModalPayload<TName extends TModalName> = TModalPayloadOf<BntModalRegistry[TName]>;

export type TModalResult<TName extends TModalName> = TModalResultOf<BntModalRegistry[TName]>;
