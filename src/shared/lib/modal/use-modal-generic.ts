import { useContext, useMemo } from "react";

import { DialogContext, DialogControlsContext } from "@/shared/ui/dialog";

export const useModalGeneric = <TConfig extends Record<string, any>, TResultConfig extends Partial<Record<keyof TConfig, any>>>(modalNames: string[]) => {
	const showModal = useContext(DialogContext);
	const { closeAll, closeByName } = useContext(DialogControlsContext);

	const modalList = useMemo(
		() =>
			modalNames.reduce(
				(acc, curr) => {
					const key = curr as keyof TConfig;
					acc[key] = {
						name: key,
						show: async (data: TConfig[typeof key] = {} as any) => {
							return showModal(key as string, data);
						},
						hide: (result?: TResultConfig[typeof key]) => closeByName(key as string, result),
					};
					return acc;
				},
				{} as { [k in keyof TConfig]: { name: k; show: (data?: TConfig[k]) => Promise<TResultConfig[k]>; hide: (result?: TResultConfig[k]) => void } }
			),
		[closeByName, showModal, modalNames]
	);

	return { showModal, closeAll, ...modalList };
};
