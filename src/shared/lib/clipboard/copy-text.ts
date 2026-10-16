export const copyText = async (value: string): Promise<void> => {
	if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(value);
		return;
	}

	if (typeof document === "undefined") {
		throw new Error("Clipboard API is not available");
	}

	const textArea = document.createElement("textarea");

	textArea.value = value;
	textArea.setAttribute("readonly", "");
	textArea.style.position = "fixed";
	textArea.style.opacity = "0";

	document.body.append(textArea);
	textArea.select();
	textArea.setSelectionRange(0, value.length);

	const isCopied = document.execCommand("copy");

	textArea.remove();

	if (!isCopied) {
		throw new Error("Copy command failed");
	}
};
