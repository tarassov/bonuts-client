import { useContext, useMemo } from "react";

import { DialogContext, DialogControlsContext, type TDialogItem, type TModalPayloadOf, type TModalResultOf } from "@/shared/ui/dialog";

type TModalHandlers<TItems> = {
	[TName in Extract<keyof TItems, string>]: {
		name: TName;
		// A modal without a payload is opened with no arguments, one with a payload requires it.
		show: (...args: TModalPayloadOf<TItems[TName]> extends void ? [] : [data: TModalPayloadOf<TItems[TName]>]) => Promise<TModalResultOf<TItems[TName]>>;
		hide: (result?: TModalResultOf<TItems[TName]>) => void;
	};
};

export const useModalGeneric = <TItems extends Record<keyof TItems, TDialogItem<any, any>>>(modalNames: Array<string>) => {
	const showModal = useContext(DialogContext);
	const { closeAll, closeByName } = useContext(DialogControlsContext);

	const modalList = useMemo(() => {
		// The handlers are built from the names the provider knows at runtime, their types come from the config.
		const handlers = modalNames.reduce<Record<string, unknown>>((acc, name) => {
			acc[name] = {
				name,
				show: (data?: unknown) => showModal(name, data),
				hide: (result?: unknown) => closeByName(name, result),
			};

			return acc;
		}, {});

		return handlers as TModalHandlers<TItems>;
	}, [closeByName, showModal, modalNames]);

	return { showModal, closeAll, ...modalList };
};
