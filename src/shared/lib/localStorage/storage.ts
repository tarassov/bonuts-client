import { getFromLocalStorage } from "shared/lib/localStorage/get-from-local-storage";
import { setToLocalStorage } from "shared/lib/localStorage/set-to-local-storage";

export const storage = {
	getValue: (name: string): string | null => {
		return getFromLocalStorage(name);
	},
	setValue: <T>(name: string, value: T): void => {
		return setToLocalStorage(name, value);
	},
};
