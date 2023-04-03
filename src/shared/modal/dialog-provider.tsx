import { cloneElement, createContext, FC, useMemo, useState } from "react";
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
	const showDialog = (key: string, data: TBntModalData) => {
		setModal((modals) => {
			return { ...modals, [key]: { ...modals[key], isOpen: true, data: data } };
		});
	};

	const handleClose = (modal: TBntModal) => {
		setModal((modals) => {
			return {
				...modals,
				[modal.key]: { ...modals[modal.key], isOpen: false, data: {} },
			};
		});
	};

	const modalsArray = useMemo(() => Object.values(modals), [modals]);

	return (
		<BntDialogContext.Provider value={showDialog}>
			<BntDialogValueContext.Provider value={modals}>
				{children}
				{modalsArray.map((modal) => {
					if (modal.isOpen) {
						return (
							<BntDialog
								open={modal.isOpen}
								key={modal.key}
								handleClose={handleClose}
								modal={modal}
							>
								{modal.renderItem(modal)}
							</BntDialog>
						);
					}
				})}
			</BntDialogValueContext.Provider>
		</BntDialogContext.Provider>
	);
};
