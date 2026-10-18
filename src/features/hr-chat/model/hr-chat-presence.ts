import { useEffect, useSyncExternalStore } from "react";

/**
 * Tracks whether the chat is already rendered as a page, so the floating button does not offer a second copy.
 * A tiny external store instead of a context: the page and the button live in different parts of the layout.
 */
let inlineInstances = 0;
const listeners = new Set<() => void>();

const notify = () => {
	for (const listener of listeners) listener();
};

const subscribe = (listener: () => void) => {
	listeners.add(listener);

	return () => {
		listeners.delete(listener);
	};
};

const getSnapshot = () => inlineInstances > 0;

export const useRegisterInlineHrChat = (isInline: boolean) => {
	useEffect(() => {
		if (!isInline) return undefined;

		inlineInstances += 1;
		notify();

		return () => {
			inlineInstances -= 1;
			notify();
		};
	}, [isInline]);
};

export const useIsInlineHrChatMounted = (): boolean => useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
