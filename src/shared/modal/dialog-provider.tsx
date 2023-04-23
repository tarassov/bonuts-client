import { FC, ReactNode, useCallback, useMemo, useState } from "react";
import { ModalType } from "config/modal-config";
import _uniqueId from "lodash/uniqueId";
import {
	BntDialogCloseContext,
	BntDialogContext,
	BntDialogValueContext,
} from "shared/modal/dialog-context";
import { BntDialogContianer } from "shared/modal/dialog-contianer";
import { TBntModalConfig } from "../types/dialog";

export const BntDialogProvider: FC<{
	config: TBntModalConfig<ModalType>;
	children: JSX.Element | Array<JSX.Element>;
}> = ({ children, config }) => {
	type ModalState = Record<
		string,
		{
			name: keyof typeof config.items;
			data: any;
			modalKey: string;
			renderItem: (d: any) => ReactNode | Array<ReactNode>;
		}
	>;

	const [modals, setModal] = useState<ModalState | null>(null);

	const showDialog = useCallback(
		<T extends keyof typeof config.items>(
			name: T,
			data: ModalType[T],
			key?: string
		) => {
			const modalKey = key || _uniqueId("modal-");
			setModal((prev) => {
				return {
					...prev,
					[modalKey]: {
						name,
						data,
						modalKey,
						renderItem:
							config.items[name]?.renderItem || ((d: T) => <div>{d}</div>),
					},
				};
			});
		},
		[]
	);

	const handleClose = useCallback((key: string) => {
		setModal((prev) => {
			if (!prev) return null;
			return Object.keys(prev).reduce((acc, curr) => {
				if (curr !== key) acc[curr] = prev[curr];
				return acc;
			}, {} as ModalState);
		});
	}, []);

	const modalsArray = useMemo(
		() => (modals ? Object.values(modals) : []),
		[modals]
	);

	return (
		<BntDialogContext.Provider value={showDialog}>
			<BntDialogCloseContext.Provider value={handleClose}>
				<BntDialogValueContext.Provider value={modalsArray}>
					{children}
					<BntDialogContianer />
				</BntDialogValueContext.Provider>
			</BntDialogCloseContext.Provider>
		</BntDialogContext.Provider>
	);
};
