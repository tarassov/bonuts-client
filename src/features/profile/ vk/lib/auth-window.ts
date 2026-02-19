import messageListener from "./message-listener";

export type TAuthResponse = {
	accessToken?: string;
	refreshToken?: string;
	expiresIn?: number;
	error?: string;
};

export function authWindow(url: string, callback: (response: TAuthResponse) => void) {
	const width = 900;
	const height = 800;
	const left = window.screen.width / 2 - width / 2;
	const top = window.screen.height / 2 - height / 2;

	const popup = window.open(
		url,
		"popup",
		`toolbar=1, scrollbars=1, location=0, statusbar=0, menubar=1, resizable=1, width=${width}, height=${height}, top=${top}, left=${left}`
	);

	if (popup) {
		messageListener<TAuthResponse>(popup, (e, closeListener) => {
			// Check if it is a right method
			if (e.data.accessToken) {
				closeListener();
				callback(e.data);
			}

			if (e.data.error) {
				closeListener();
			}
		});
	}
}
