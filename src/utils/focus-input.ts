export const focusInput = (input?: HTMLInputElement | null) => {
	if (input) {
		input.focus();
		const tempValue = input.value;
		// eslint-disable-next-line no-param-reassign
		input.value = "";
		// eslint-disable-next-line no-param-reassign
		input.value = tempValue;
	}
};
