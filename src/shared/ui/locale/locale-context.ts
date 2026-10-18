import { createContext } from "react";

import type { Locale } from "date-fns";

import { getDefaultLocale, LOCALES } from "@/shared/config/locale";

import enLocale from "date-fns/locale/en-GB";

export type TLocaleContextValue = {
	locale: LOCALES;
	setLocale: (locale: LOCALES) => Promise<void>;
};

export const LocaleContext = createContext<TLocaleContextValue>({
	locale: getDefaultLocale(),
	setLocale: async () => undefined,
});

export const DateLocaleContext = createContext<Locale>(enLocale);
