import { FC, useMemo } from "react";
import { enUS, PickersInputComponentLocaleText, ruRU } from "@mui/x-date-pickers/locales";

import { useStorage } from "shared/lib/localStorage";
import { LocaleContext } from "shared/ui/locale/locale-context";
import { PickerLocaleContext } from "shared/ui/locale/picker-locale-context";

import enLocale from "date-fns/locale/en-GB";
import kkLocale from "date-fns/locale/kk";
import ruLocale from "date-fns/locale/ru";
import { DateFnsProvider } from "react-hook-form-mui/dist/date-fns";

const LOCALE_STORAGE_KEY = "locale";
enum LOCALES {
	en = "en",
	kk = "kk",
	ru = "ru",
}
type TProfileStorageConfig = { locale: LOCALES };

export const getDateLocale = () => {
	const browserLocale = (navigator.language || LOCALES.en).toLowerCase();

	if (browserLocale.startsWith(LOCALES.kk)) return LOCALES.kk;
	if (browserLocale.startsWith(LOCALES.ru)) return LOCALES.ru;

	return LOCALES.en;
};

export const LocaleProvider: FC<{ children: JSX.Element | Array<JSX.Element> }> = ({ children }) => {
	const [savedLocale] = useStorage<TProfileStorageConfig, typeof LOCALE_STORAGE_KEY>(LOCALE_STORAGE_KEY, getDateLocale());

	const normalizedLocale = useMemo(() => {
		if (savedLocale.toLowerCase().startsWith(LOCALES.kk)) return LOCALES.kk;
		if (savedLocale.toLowerCase().startsWith(LOCALES.ru)) return LOCALES.ru;

		return LOCALES.en;
	}, [savedLocale]);

	const locale = normalizedLocale === LOCALES.kk ? kkLocale : normalizedLocale === LOCALES.ru ? ruLocale : enLocale;
	const pickerLocaleText: PickersInputComponentLocaleText<any> | undefined =
		normalizedLocale === LOCALES.ru || normalizedLocale === LOCALES.kk
			? ruRU.components.MuiLocalizationProvider.defaultProps.localeText
			: enUS.components.MuiLocalizationProvider.defaultProps.localeText;

	return (
		<LocaleContext.Provider value={locale}>
			<PickerLocaleContext.Provider value={pickerLocaleText}>
				<DateFnsProvider adapterLocale={locale}>{children}</DateFnsProvider>
			</PickerLocaleContext.Provider>
		</LocaleContext.Provider>
	);
};
