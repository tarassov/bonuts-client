import { getFromLocalStorage } from "shared/lib/localStorage/get-from-local-storage";
import { useCallback } from "react";
import { setToLocalStorage } from "shared/lib/localStorage/set-to-local-storage";

export function useStorage() {
	const getValue = useCallback(<T>(name: string): T | null => {
		return getFromLocalStorage(name);
	}, []);

	const setValue = useCallback(<T>(name: string, value: T): void => {
		return setToLocalStorage(name, value);
	}, []);

	return {
		getValue,
		setValue,
	};
}
