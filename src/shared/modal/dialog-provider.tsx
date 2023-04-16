import { createContext, FC, useCallback, useMemo, useState } from "react";
import {
	TBntModal,
	TBntModalConfig,
	TBntModalData,
	TBntModalItems,
} from "../types/dialog";
import { BntDialog } from "./dialog";

export const BntDialogContext = createContext<
	(key: string, data: TBntModalData) => void
>(() => {});
export const BntDialogValueContext = createContext<TBntModalItems>({});

export const BntDialogProvider: FC<{
	config: TBntModalConfig;
	children: JSX.Element | Array<JSX.Element>;
}> = ({ children, config }) => {
	const [modals, setModal] = useState<TBntModalItems>(config.items);

	const showDialog = useCallback((key: string, data: TBntModalData) => {
		setModal((prev) => {
			return { ...prev, [key]: { ...prev[key], isOpen: true, data } };
		});
	}, []);

	const handleClose = useCallback((modal: TBntModal) => {
		setModal((prev) => {
			return {
				...prev,
				[modal.key]: { ...prev[modal.key], isOpen: false, data: {} },
			};
		});
	}, []);

	const modalsArray = useMemo(() => Object.values(modals), [modals]);

	return (
		<BntDialogContext.Provider value={showDialog}>
			<BntDialogValueContext.Provider value={modals}>
				{children}
				{modalsArray
					.filter((x) => x.isOpen)
					.map((modal) => {
						return (
							<BntDialog
								open={modal.isOpen || false}
								key={modal.key}
								handleClose={handleClose}
								modal={modal}
							>
								{modal.renderItem(modal)}
							</BntDialog>
						);
					})}
			</BntDialogValueContext.Provider>
		</BntDialogContext.Provider>
	);
};
