import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { isFunction } from "lodash";
import { filter, map } from "ramda";

import { CommonStrings } from "constants/dictionary";

import { useAppNavigate } from "@/shared/lib/navigation";
import { isBlank, present } from "@/shared/lib/type-guards";

import { BntDialogContainer } from "./dialog-container";
import { DialogCloseContext, DialogContext, DialogControlsContext, DialogNamesContext, DialogValueContext, TShowDialog } from "./dialog-context";
import { TDialogConfig, TDialogItem, TModalPayloadOf, TModalRecord } from "./dialog-types";
import _uniqueId from "lodash/uniqueId";

interface IBntDialogProviderProps<TItems extends Record<keyof TItems, TDialogItem<any, any>>> {
	config: TDialogConfig<TItems>;
	children: ReactNode;
	// A modal declared by the history entry is opened only once the application can serve it, auth included.
	isRestoreEnabled?: boolean;
}

type ModalState = Record<string, TModalRecord>;
type TClaimedEntry = { index: number; modalKey: string };
type ResolverMap = Map<string, (value: any) => void>;
type TCloseOptions = { popHistory?: boolean; result?: unknown };

export function BntDialogProvider<TItems extends Record<keyof TItems, TDialogItem<any, any>>>({ children, config, isRestoreEnabled = true }: IBntDialogProviderProps<TItems>) {
	const { go, location, navigate, replace } = useAppNavigate();
	const resolversRef = useRef<ResolverMap>(new Map());

	const [modals, setModal] = useState<ModalState | null>(null);

	// Lets the close helpers read the opened modals without depending on them.
	const modalsRef = useRef<ModalState | null>(null);
	modalsRef.current = modals;

	// Lets the history helpers read the current location without being recreated on every navigation.
	const locationRef = useRef(location);
	locationRef.current = location;

	// Modals that own a browser history entry, with the depth of that entry in the chain of opened modals.
	const historyStackRef = useRef<Array<TClaimedEntry>>([]);
	const previousPathnameRef = useRef(location.pathname);

	// Modals that are still open for the application: the closing ones only wait for their transition to finish.
	const getOpenModals = useCallback(() => Object.values(modalsRef.current ?? {}).filter((modal) => !modal.isClosing), []);

	// Every modal removal has to settle the promise returned by showDialog, otherwise its caller waits forever.
	const resolveModal = useCallback((key: string, result?: unknown) => {
		const resolve = resolversRef.current.get(key);
		resolversRef.current.delete(key);
		if (resolve) resolve(result);
	}, []);

	// Drops the closed modals from the history stack and tells how far back the browser has to travel.
	// Only a contiguous run on top of the stack is released, otherwise the traverse would take foreign entries with it.
	const releaseHistoryEntries = useCallback((closingKeys: Set<string>) => {
		const stack = [...historyStackRef.current];
		const topIndex = stack.length > 0 ? stack[stack.length - 1].index : 0;
		let hasReleasedTop = false;

		while (stack.length > 0 && closingKeys.has(stack[stack.length - 1].modalKey)) {
			stack.pop();
			hasReleasedTop = true;
		}
		const remainingIndex = stack.length > 0 ? stack[stack.length - 1].index : 0;
		historyStackRef.current = stack.filter((entry) => !closingKeys.has(entry.modalKey));

		// The distance is measured in depth: a modal restored after a reload owns every entry down to the one below it.
		return hasReleasedTop ? topIndex - remainingIndex : 0;
	}, []);

	const closeModals = useCallback(
		(keys: Array<string>, options?: TCloseOptions) => {
			if (isBlank(keys)) return;

			const closingKeys = new Set(keys);
			const popDistance = releaseHistoryEntries(closingKeys);

			// The record survives until the dialog has animated itself out, see removeModal.
			setModal((prev) => (isBlank(prev) ? null : map((modal) => (closingKeys.has(modal.modalKey) ? { ...modal, isClosing: true } : modal), prev)));
			keys.forEach((key) => resolveModal(key, options?.result));

			// A modal closed by the Back button has already lost its entry, so there is nothing to pop.
			if (options?.popHistory !== false && popDistance > 0) {
				go(-popDistance);
			}
		},
		[go, releaseHistoryEntries, resolveModal]
	);

	const removeModal = useCallback((key: string) => {
		setModal((prev) => (isBlank(prev) ? null : filter((modal) => modal.modalKey !== key, prev)));
	}, []);

	// The single place that reacts to history moves: Back, Forward and leaving the page.
	useEffect(() => {
		const previousPathname = previousPathnameRef.current;
		previousPathnameRef.current = location.pathname;

		const openedModals = getOpenModals();
		if (isBlank(openedModals)) return;

		const historyStack = historyStackRef.current;
		const currentIndex = location.state?.modalIndex ?? 0;
		const declaredKey = location.state?.modalKey;
		const hasLeftPage = previousPathname !== location.pathname;

		// A modal survives while the current entry is at least as deep as the one it owns. A shallower entry means
		// the user went back past it; a deeper unknown one is a Forward or a restoration and covers it just as well.
		const keysToClose = openedModals
			.filter((modal) => {
				const claimed = historyStack.find((entry) => entry.modalKey === modal.modalKey);

				if (!claimed) return hasLeftPage;

				return claimed.index > currentIndex && declaredKey !== modal.modalKey;
			})
			.map((modal) => modal.modalKey);

		// An entry that declares an opened modal becomes the entry it owns, so a further Back still closes it.
		historyStackRef.current = historyStack.map((entry) => (entry.modalKey === declaredKey ? { ...entry, index: Math.min(entry.index, currentIndex) } : entry));

		closeModals(keysToClose, { popHistory: false });
	}, [closeModals, getOpenModals, location.pathname, location.state]);

	// A provider unmount drops the whole stack, so nothing is left waiting on it.
	useEffect(() => {
		const resolvers = resolversRef.current;

		return () => {
			resolvers.forEach((resolve) => resolve(undefined));
			resolvers.clear();
		};
	}, []);

	// Every modal that closes on Back owns a history entry, identified by its depth in the chain of opened modals.
	const claimHistoryEntry = useCallback(
		({ data, modalKey, name, parsedPath }: { data: unknown; modalKey: string; name: string; parsedPath: string | null }) => {
			// One entry per modal: reopening under the same key (a remount in strict mode) must not claim another.
			if (historyStackRef.current.some((entry) => entry.modalKey === modalKey)) return;

			const currentLocation = locationRef.current;
			const currentEntry = { hash: currentLocation.hash, pathname: currentLocation.pathname, search: currentLocation.search };
			const currentIndex = currentLocation.state?.modalIndex ?? 0;
			const hasOwnAddress = present(parsedPath) && parsedPath !== currentLocation.pathname;
			// The address already belongs to the modal — a deep link or a page reload — so it keeps that entry's depth.
			const takesOverEntry = present(parsedPath) && !hasOwnAddress;
			const index = takesOverEntry ? currentIndex || 1 : currentIndex + 1;

			if (hasOwnAddress) {
				// The modal has an address of its own, so it gets an entry showing it.
				navigate(parsedPath, { background: currentLocation, data, modal: true, modalIndex: index, modalKey, name });
			} else if (takesOverEntry) {
				replace(currentEntry, { ...currentLocation.state, modalIndex: index, modalKey });
			} else {
				// The same URL one level deeper, so Back consumes only this entry and the address stays put.
				// What the entry declares is left untouched: it describes the modal below, not this one.
				navigate(currentEntry, { ...currentLocation.state, modalIndex: index });
			}
			historyStackRef.current = [...historyStackRef.current, { index, modalKey }];
		},
		[navigate, replace]
	);

	const showDialog = useCallback(
		async <TName extends Extract<keyof TItems, string>>(name: TName, data: TModalPayloadOf<TItems[TName]>, key?: string) => {
			const modalKey = key || _uniqueId("modal-");
			const item = config.items[name];
			const { getPath, title } = item;
			const modalTitle = isFunction(title) ? title(data) : title;
			const routePath = getPath ? getPath(data) : null;
			const parsedPath = routePath ? (routePath[0] === "/" ? routePath : `/${routePath}`) : null;
			// A modal takes part in history handling when Back has to close it or when it has its own address.
			const tracksHistory = Boolean(item.closeOnBack) || present(parsedPath);

			if (tracksHistory) {
				claimHistoryEntry({ data, modalKey, name, parsedPath });
			}
			setModal((prev) => {
				return {
					...prev,
					[modalKey]: {
						name,
						data,
						modalKey,
						title: modalTitle || CommonStrings.EMPTY_STRING,
						renderItem: item.renderItem,
						hasTopMenu: item.hasTopMenu || false,
						isTop: item.isTop || false,
						dialogPaperSx: item.dialogPaperSx,
						allowFullscreen: item.allowFullscreen || false,
						preventCloseOnBackDropClick: item.preventCloseOnBackDropClick || false,
					},
				};
			});

			// Reopening under the same key supersedes the previous call, which must not stay pending.
			resolveModal(modalKey);

			return new Promise((resolve) => {
				resolversRef.current.set(modalKey, resolve);
			});
		},
		[claimHistoryEntry, config, resolveModal]
	);

	const handleClose = useCallback(
		(key: string, result?: any) => {
			closeModals([key], { result });
		},
		[closeModals]
	);

	// The same modal name can be opened several times, so every instance of it has to be closed.
	const closeByName = useCallback(
		(name: string, result?: any) => {
			const keys = getOpenModals()
				.filter((modal) => modal.name === name)
				.map((modal) => modal.modalKey);

			closeModals(keys, { result });
		},
		[closeModals, getOpenModals]
	);

	const closeAll = useCallback(
		(result?: any) => {
			closeModals(
				getOpenModals().map((modal) => modal.modalKey),
				{ result }
			);
		},
		[closeModals, getOpenModals]
	);

	const dialogControls = useMemo(() => ({ closeAll, closeByName, removeModal }), [closeAll, closeByName, removeModal]);

	// Opens the modal the current history entry declares: a deep link, a page reload or a Forward lands here.
	useEffect(() => {
		if (!isRestoreEnabled) return;

		const { data, modalKey, name } = location.state ?? {};

		if (isBlank(name) || isBlank(modalKey)) return;
		// A modal that no longer exists in the config would have been left over by an older version of the app.
		if (!(name in config.items)) return;
		if (getOpenModals().some((modal) => modal.modalKey === modalKey)) return;

		showDialog(name as Extract<keyof TItems, string>, data, modalKey);
	}, [config.items, getOpenModals, isRestoreEnabled, location.state, showDialog]);

	const modalsArray = useMemo(() => (modals ? Object.values(modals) : []), [modals]);

	const modalNames = useMemo(() => Object.keys(config.items), [config.items]);

	// The context serves whichever config is registered, so the concrete one given to this provider is widened.
	return (
		<DialogContext.Provider value={showDialog as TShowDialog}>
			<DialogNamesContext.Provider value={modalNames}>
				<DialogCloseContext.Provider value={handleClose}>
					<DialogControlsContext.Provider value={dialogControls}>
						<DialogValueContext.Provider value={modalsArray}>
							{children}
							<BntDialogContainer />
						</DialogValueContext.Provider>
					</DialogControlsContext.Provider>
				</DialogCloseContext.Provider>
			</DialogNamesContext.Provider>
		</DialogContext.Provider>
	);
}
