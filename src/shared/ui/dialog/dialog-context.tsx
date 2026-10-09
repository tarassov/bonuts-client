import { createContext } from "react";

import { emptyFunction } from "utils/empty-function";

import type { TModalRecord } from "./dialog-types";
import type { TModalName, TModalPayload, TModalResult } from "./modal-registry";

export type TShowDialog = {
	<TName extends TModalName>(name: TName, data: TModalPayload<TName>, key?: string): Promise<TModalResult<TName>>;
	// A config that is not registered in BntModalRegistry (tests, isolated providers) still has to be openable.
	(name: string, data: unknown, key?: string): Promise<unknown>;
};

// biome-ignore lint/suspicious/noEmptyBlockStatements: context default
export const DialogContext = createContext<TShowDialog>(async () => undefined);

export const DialogNamesContext = createContext<Array<string>>([]);

export const DialogCloseContext = createContext<{ (key: string, result?: any): void }>(emptyFunction);

// Modal keys are generated inside the provider, so closing by name or closing everything
// can only be resolved there, against the currently opened modals.
export type TDialogControls = {
	closeAll: (result?: any) => void;
	closeByName: (name: string, result?: any) => void;
	// Drops a closed modal once its exit transition has finished.
	removeModal: (key: string) => void;
};

export const DialogControlsContext = createContext<TDialogControls>({
	closeAll: emptyFunction,
	closeByName: emptyFunction,
	removeModal: emptyFunction,
});

export const DialogValueContext = createContext<Array<TModalRecord>>([]);
