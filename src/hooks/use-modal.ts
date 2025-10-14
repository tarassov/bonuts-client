import { useCallback, useContext, useMemo } from "react";

import { BntDialogCloseContext, BntDialogContext } from "shared/ui/modal/dialog-context";

import { modalConfig, TModalConfig } from "@/app/config/modal-config";

export const useModal = () => {
	const showModal = useContext(BntDialogContext);
	const handleClose = useContext(BntDialogCloseContext);

	const closeAll = useCallback(() => {
		Object.keys(modalConfig.items).forEach((modal) => {
			handleClose(modal, modal);
		});
	}, [handleClose]);

	const modalList = useMemo(
		() =>
			Object.keys(modalConfig.items).reduce((acc, curr) => {
				const key = curr as any as keyof TModalConfig;
				acc[key] = {
					name: key,
					show: (data: TModalConfig[typeof key]) => {
						showModal(key, data);
					},
					hide: () => handleClose(key, key),
				};
				return acc;
			}, {} as { [k in keyof TModalConfig]: { name: keyof TModalConfig; show: (data: TModalConfig[k]) => void; hide: VoidFunction } }),
		[handleClose, showModal]
	);

	return { showModal, closeAll, ...modalList };
};
