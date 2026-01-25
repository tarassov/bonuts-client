import { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isFunction } from "lodash";
import _uniqueId from "lodash/uniqueId";
import { BntDialogContainer } from "shared/ui/dialog/dialog-container";
import {
	DialogCloseContext,
	DialogContext,
	DialogNamesContext,
	DialogValueContext,
} from "shared/ui/dialog/dialog-context";

import { CommonStrings } from "constants/dictionary";

import { useLocationTyped } from "hooks/use-location-typed";

import type { TDialogConfig } from "./dialog-types";

interface IBntDialogProviderProps<T extends Record<string, any>> {
	config: TDialogConfig<T>;
	path: string;
	addressPath: string; // could be different for dialog path's
	children: JSX.Element | Array<JSX.Element>;
	defaultModal?: keyof T;
	defaultModalData?: any;
}

export function BntDialogProvider<T extends Record<string, any>>({
	children,
	config,
	path,
	addressPath,
	defaultModal,
	defaultModalData,
}: IBntDialogProviderProps<T>) {
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
	const openedDefaultRef = useRef(false);

	const [modals, setModal] = useState<ModalState | null>(null);

	// close all modals after path has changed
	useEffect(() => {
		setModal(null);
	}, [path]);

	const showDialog = useCallback(
		<TModalName extends keyof typeof config.items>(name: TModalName, data: T[TModalName], key?: string) => {
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
						renderItem: config.items[name]?.renderItem || ((d: any) => <div>{d}</div>),
						hasTopMenu: config.items[name]?.hasTopMenu || false,
						isTop: config.items[name]?.isTop || false,
						preventCloseOnBackDropClick: config.items[name]?.preventCloseOnBackDropClick || false,
					},
				};
			});
		},
		[addressPath, config, location, navigate, path]
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
		if (!defaultModal || openedDefaultRef.current) return;

		showDialog(defaultModal, defaultModalData);
		openedDefaultRef.current = true;
	}, [defaultModal, defaultModalData, showDialog]);

	const modalsArray = useMemo(() => (modals ? Object.values(modals) : []), [modals]);

	const modalNames = useMemo(() => Object.keys(config.items), [config.items]);

	return (
		<DialogContext.Provider value={showDialog}>
			<DialogNamesContext.Provider value={modalNames}>
				<DialogCloseContext.Provider value={handleClose}>
					<DialogValueContext.Provider value={modalsArray}>
						{children}
						<BntDialogContainer />
					</DialogValueContext.Provider>
				</DialogCloseContext.Provider>
			</DialogNamesContext.Provider>
		</DialogContext.Provider>
	);
}
