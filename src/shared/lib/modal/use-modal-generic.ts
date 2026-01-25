import { useCallback, useContext, useMemo } from "react";
import { DialogCloseContext, DialogContext } from "shared/ui/dialog/dialog-context";

export const useModalGeneric = <TConfig extends Record<string, any>>(modalNames: string[]) => {
	const showModal = useContext(DialogContext);
	const handleClose = useContext(DialogCloseContext);

	const closeAll = useCallback(() => {
		modalNames.forEach((modal) => {
			handleClose(modal, modal);
		});
	}, [handleClose, modalNames]);

	const modalList = useMemo(
		() =>
			modalNames.reduce((acc, curr) => {
				const key = curr as keyof TConfig;
				acc[key] = {
					name: key,
					show: (data: TConfig[typeof key] = {} as any) => {
						showModal(key as string, data);
					},
					hide: () => handleClose(key as string, key as string),
				};
				return acc;
			}, {} as { [k in keyof TConfig]: { name: k; show: (data?: TConfig[k]) => void; hide: VoidFunction } }),
		[handleClose, showModal, modalNames]
	);

	return { showModal, closeAll, ...modalList };
};
