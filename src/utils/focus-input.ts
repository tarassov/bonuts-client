export const focusInput = (input?: HTMLInputElement | null) => {
	if (input) {
		input.focus();
		const tempValue = input.value;
		input.value = "";
		input.value = tempValue;
	}
};
