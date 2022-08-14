export function useStorage() {
	function getValue<T>(name: string): T | null {
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

	function setValue<T>(name: string, value: T): void {
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

	return {
		getValue,
		setValue,
	};
}
