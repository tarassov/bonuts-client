import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { isFunction } from "lodash";
import { filter } from "ramda";

import { CommonStrings } from "constants/dictionary";
import { useAppNavigate } from "shared/lib/navigation";
import { isBlank, present } from "shared/lib/type-guards";
import { BntDialogContainer } from "shared/ui/dialog/dialog-container";
import { DialogCloseContext, DialogContext, DialogNamesContext, DialogValueContext } from "shared/ui/dialog/dialog-context";

import { TDialog, TDialogConfig } from "./dialog-types";
import _uniqueId from "lodash/uniqueId";

interface IBntDialogProviderProps<T extends Record<string, any>> {
	config: TDialogConfig<T>;
	path: string;
	addressPath: string; // could be different for dialog path's
	children: JSX.Element | Array<JSX.Element>;
	defaultModal?: Extract<keyof T, string>;
	defaultModalData?: any;
}

type TModal = {
	name: string;
	data: unknown;
	modalKey: string;
	renderItem: TDialog<any>["renderItem"];
	hasTopMenu: boolean;
	title: string;
	path?: string | null;
};

type ModalState = Record<string, TModal>;
type ResolverMap = Map<string, (value: any) => void>;

export function BntDialogProvider<T extends Record<string, any>>({
	children,
	config,
	path,
	addressPath,
	defaultModal,
	defaultModalData,
}: IBntDialogProviderProps<T>) {
	const { goBack, location, navigate } = useAppNavigate();
	const resolversRef = useRef<ResolverMap>(new Map());

	const [modals, setModal] = useState<ModalState | null>(null);

	// close all modals after path has changed
	useEffect(() => {
		if (isBlank(location?.pathname)) return;

		setModal((prev) => {
			if (isBlank(prev)) return null;
			return filter((modal) => isBlank(modal.path) || modal.path === location.pathname, prev);
		});
	}, [location.pathname]);

	useEffect(() => {
		console.log("modals", modals);
	}, [modals]);

	const showDialog = useCallback(
		async <TModalName extends string>(name: TModalName, data: T[TModalName], key?: string) => {
			const modalKey = key || _uniqueId(`modal-${path}-`);
			const { title, getPath } = config.items[name];
			const modalTitle = isFunction(title) ? title(data as never) : title;
			const routePath = getPath ? getPath(data) : null;
			const parsedPath = routePath ? (routePath[0] === "/" ? routePath : `/${routePath}`) : null;

			console.log("showDialog", { parsedPath, addressPath, name, data, key });

			if (present(parsedPath) && parsedPath !== addressPath) {
				navigate(parsedPath, {
					background: location,
					name,
					data,
					modal: true,
				});
			}
			setModal((prev) => {
				return {
					...prev,
					[modalKey]: {
						name,
						data,
						modalKey,
						path: parsedPath,
						title: modalTitle || CommonStrings.EMPTY_STRING,
						renderItem: config.items[name]?.renderItem || ((d: any) => <div>{d}</div>),
						hasTopMenu: config.items[name]?.hasTopMenu || false,
						isTop: config.items[name]?.isTop || false,
						preventCloseOnBackDropClick: config.items[name]?.preventCloseOnBackDropClick || false,
					},
				};
			});

			return new Promise((resolve) => {
				resolversRef.current.set(modalKey, resolve);
			});
		},
		[addressPath, config, location, navigate, path]
	);

	const handleClose = useCallback(
		(key: string, name: string, result: any) => {
			const { items } = config;
			if (name) {
				const { getPath } = items[name as keyof typeof config.items];
				if (getPath) {
					goBack();
				}
			}
			setModal((prev) => {
				if (!prev) return null;
				return Object.keys(prev).reduce((acc, curr) => {
					if (curr !== key) acc[curr] = prev[curr];
					return acc;
				}, {} as ModalState);
			});
			const resolve = resolversRef.current.get(key);
			if (resolve) resolve(result);
			resolversRef.current.delete(key);
		},
		[config, goBack]
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <runs only once>
	useEffect(() => {
		if (!defaultModal) return;

		showDialog(defaultModal, defaultModalData, "default");
	}, []);

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
