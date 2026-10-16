import { getFromLocalStorage } from "./get-from-local-storage";
import { setToLocalStorage } from "./set-to-local-storage";

export const storage = {
	getValue: (name: string): string | null => {
		return getFromLocalStorage(name);
	},
	setValue: <T>(name: string, value: T): void => {
		return setToLocalStorage(name, value);
	},
};
