import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { ModalType } from "config/modal-config";
import _uniqueId from "lodash/uniqueId";
import {
	BntDialogCloseContext,
	BntDialogContext,
	BntDialogValueContext,
} from "shared/modal/dialog-context";
import { BntDialogContainer } from "shared/modal/dialog-container";
import { isFunction } from "lodash";
import { CommonStrings } from "constants/dictionary";
import { TBntModalConfig } from "../types/dialog-types";

export const BntDialogProvider: FC<{
	config: TBntModalConfig<ModalType>;
	path: string;
	children: JSX.Element | Array<JSX.Element>;
}> = ({ children, config, path }) => {
	type ModalState = Record<
		string,
		{
			name: keyof typeof config.items;
			data: any;
			modalKey: string;
			renderItem: (d: any) => ReactNode | Array<ReactNode>;
			hasTopMenu: boolean;
			title: string;
		}
	>;

	const [modals, setModal] = useState<ModalState | null>(null);

	// close all modals after path has changed
	useEffect(() => {
		setModal(null);
	}, [path]);

	const showDialog = useCallback(
		<T extends keyof typeof config.items>(name: T, data: ModalType[T], key?: string) => {
			const modalKey = key || _uniqueId(`modal-${path}-`);
			const { title } = config.items[name];
			const modalTitle = isFunction(title) ? title(data as never) : title;
			setModal((prev) => {
				return {
					...prev,
					[modalKey]: {
						name,
						data,
						modalKey,
						title: modalTitle || CommonStrings.EMPTY_STRING,
						renderItem: config.items[name]?.renderItem || ((d: T) => <div>{d}</div>),
						hasTopMenu: config.items[name]?.hasTopMenu || false,
						preventCloseOnBackDropClick: config.items[name]?.preventCloseOnBackDropClick || false,
					},
				};
			});
		},
		[path]
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

	const modalsArray = useMemo(() => (modals ? Object.values(modals) : []), [modals]);

	return (
		<BntDialogContext.Provider value={showDialog}>
			<BntDialogCloseContext.Provider value={handleClose}>
				<BntDialogValueContext.Provider value={modalsArray}>
					{children}
					<BntDialogContainer />
				</BntDialogValueContext.Provider>
			</BntDialogCloseContext.Provider>
		</BntDialogContext.Provider>
	);
};
