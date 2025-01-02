export function setToLocalStorage<T>(name: string, value: T): void {
	const settingsJson = localStorage.getItem("settings");
	let settings: { [key: string]: unknown } = {};
	if (settingsJson) {
		try {
			settings = JSON.parse(settingsJson);
		} catch (e) {
			localStorage.removeItem("settings");
		}
	}

	settings[name] = value;
	localStorage.setItem("settings", JSON.stringify(settings));
}
