import { getDefaultLocale, LOCALES } from "@/shared/config/locale";

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);

const isRuDefaultHost = () => {
	if (typeof window === "undefined") return false;

	const { hostname } = window.location;

	return LOCAL_HOSTNAMES.has(hostname) || hostname.endsWith(".ru");
};

export const getBrowserLocale = () => {
	if (isRuDefaultHost()) {
		return LOCALES.ru;
	}

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
