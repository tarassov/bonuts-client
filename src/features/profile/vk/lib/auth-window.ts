import messageListener from "./message-listener";

export type TAuthResponse = {
	success?: boolean;
	error?: string;
};

export function authWindow(url: string, callback: (response: TAuthResponse) => void) {
	const width = 900;
	const height = 800;
	const left = window.screen.width / 2 - width / 2;
	const top = window.screen.height / 2 - height / 2;

	const popup = window.open(url, "popup", `toolbar=1, scrollbars=1, location=0, statusbar=0, menubar=1, resizable=1, width=${width}, height=${height}, top=${top}, left=${left}`);

	if (popup) {
		let isSettled = false;
		const closeWatcher = window.setInterval(() => {
			if (!popup.closed || isSettled) return;

			window.clearInterval(closeWatcher);
			isSettled = true;
			callback({ error: "Authentication cancelled" });
		}, 500);

		messageListener<TAuthResponse>(popup, (e, closeListener) => {
			if (e.data.success) {
				closeListener();
				window.clearInterval(closeWatcher);
				isSettled = true;
				callback(e.data);
			}

			if (e.data.error) {
				closeListener();
				window.clearInterval(closeWatcher);
				isSettled = true;
				callback(e.data);
			}
		});
	}
}
