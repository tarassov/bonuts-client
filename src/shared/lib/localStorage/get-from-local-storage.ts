export function getFromLocalStorage<T>(name: string): T | null {
	const settingsJson = localStorage.getItem("settings");
	if (settingsJson) {
		try {
			return JSON.parse(settingsJson)[name];
		} catch (e) {
			localStorage.removeItem("settings");
			return null;
		}
	} else {
		return null;
	}
}
