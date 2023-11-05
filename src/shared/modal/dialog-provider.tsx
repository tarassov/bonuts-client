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
import { useLocationTyped } from "hooks/use-location-typed";
import { useNavigate } from "react-router-dom";
import { TBntModalConfig } from "../types/dialog-types";

export const BntDialogProvider: FC<{
	config: TBntModalConfig<ModalType>;
	path: string;
	addressPath: string; // could be different for modal path's
	children: JSX.Element | Array<JSX.Element>;
	defaultModal?: keyof ModalType;
	defaultModalData?: any;
}> = ({ children, config, path, addressPath, defaultModal, defaultModalData }) => {
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
	const navigate = useNavigate();
	const location = useLocationTyped();

	const [modals, setModal] = useState<ModalState | null>(null);

	// close all modals after path has changed
	useEffect(() => {
		setModal(null);
	}, [path]);

	const showDialog = useCallback(
		<T extends keyof typeof config.items>(name: T, data: ModalType[T], key?: string) => {
			const modalKey = key || _uniqueId(`modal-${path}-`);
			const { title, getPath } = config.items[name];
			const modalTitle = isFunction(title) ? title(data as never) : title;

			if (getPath) {
				let newPath = getPath(data);
				newPath = newPath[0] === "/" ? newPath : `/${newPath}`;
				if (addressPath !== newPath) {
					navigate(getPath(data), {
						state: { background: location, name, data, modal: true },
					});
				}
			}
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
						isTop: config.items[name]?.isTop || false,
						preventCloseOnBackDropClick: config.items[name]?.preventCloseOnBackDropClick || false,
					},
				};
			});
		},
		[path]
	);

	const handleClose = useCallback(
		(key: string, name: string) => {
			const { items } = config;
			if (name) {
				const { getPath } = items[name as keyof typeof config.items];
				if (getPath) {
					navigate(-1);
				}
			}
			setModal((prev) => {
				if (!prev) return null;
				return Object.keys(prev).reduce((acc, curr) => {
					if (curr !== key) acc[curr] = prev[curr];
					return acc;
				}, {} as ModalState);
			});
		},
		[config, navigate]
	);

	useEffect(() => {
		if (defaultModal && defaultModalData) {
			showDialog(defaultModal, defaultModalData);
		}
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
