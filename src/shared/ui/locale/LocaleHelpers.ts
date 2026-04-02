import { LOCALES } from "shared/ui/locale/locale-context";

export const getBrowserLocale = () => {
	const browserLocale = (navigator.language || LOCALES.en).toLowerCase();

	if (browserLocale.startsWith(LOCALES.kk)) return LOCALES.kk;
	if (browserLocale.startsWith(LOCALES.ru)) return LOCALES.ru;

	return LOCALES.en;
};

export const normalizeLocale = (locale?: string | null) => {
	const normalizedLocale = locale?.toLowerCase();

	if (normalizedLocale?.startsWith(LOCALES.kk)) return LOCALES.kk;
	if (normalizedLocale?.startsWith(LOCALES.ru)) return LOCALES.ru;

	return LOCALES.en;
};
