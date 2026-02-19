// wrapper to message listener that provides closeListener method
export default function messageListener<T>(popup: Window | null, callback: (e: MessageEvent<T>, closeListener: VoidFunction) => void) {
	// remove listener if popup is closed
	const checkPopup = setInterval(async () => {
		if (!popup || popup.closed) {
			clearInterval(checkPopup);
			window.removeEventListener("message", wrapper);
		}
	}, 500);
	const wrapper = (e: MessageEvent<T>) => {
		if (popup && !popup.closed) {
			callback(e, () => {
				clearInterval(checkPopup);
				window.removeEventListener("message", wrapper);
				popup?.close();
			});
		}
	};
	window.addEventListener("message", wrapper);
}
