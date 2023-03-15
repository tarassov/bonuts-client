import { useTranslation } from "react-i18next";

export const useBntTranslate = () => {
	const { t } = useTranslation();

	const translate = (value?: string | null): string => {
		if (value) return t(value);
		return "";
	};

	return { translate };
};
