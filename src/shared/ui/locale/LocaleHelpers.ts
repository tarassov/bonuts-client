import { getDefaultLocale, LOCALES } from "@/shared/config/locale";

export const getBrowserLocale = () => {
	const browserLocale = (navigator.language || getDefaultLocale()).toLowerCase();

	if (browserLocale.startsWith(LOCALES.en)) return LOCALES.en;
	if (browserLocale.startsWith(LOCALES.kk)) return LOCALES.kk;
	if (browserLocale.startsWith(LOCALES.ru)) return LOCALES.ru;

	return getDefaultLocale();
};

export const normalizeLocale = (locale?: string | null) => {
	const normalizedLocale = locale?.toLowerCase();

	if (normalizedLocale?.startsWith(LOCALES.en)) return LOCALES.en;
	if (normalizedLocale?.startsWith(LOCALES.kk)) return LOCALES.kk;
	if (normalizedLocale?.startsWith(LOCALES.ru)) return LOCALES.ru;

	return getDefaultLocale();
};
