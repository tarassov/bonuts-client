import { useTranslation } from "react-i18next";

export const useBntTranslate = () => {
	const { t } = useTranslation();

	const translate = (value?: string | null): string | null => {
		if (value) return t(value);
		return null;
	};

	return { translate };
};
