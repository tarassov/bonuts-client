import { createContext } from "react";

import type { Locale } from "date-fns";

import enLocale from "date-fns/locale/en-GB";

export enum LOCALES {
	en = "en",
	kk = "kk",
	ru = "ru",
}

export type TLocaleContextValue = {
	locale: LOCALES;
	setLocale: (locale: LOCALES) => Promise<void>;
};

export const LocaleContext = createContext<TLocaleContextValue>({
	locale: LOCALES.en,
	setLocale: async () => undefined,
});

export const DateLocaleContext = createContext<Locale>(enLocale);
