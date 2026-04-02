import { type FC, type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { enUS, type PickersInputComponentLocaleText, ruRU } from "@mui/x-date-pickers/locales";

import i18n from "i18next";

import { useStorage } from "shared/lib/localStorage";
import { getBrowserLocale, normalizeLocale } from "shared/ui/locale/LocaleHelpers";
import { DateLocaleContext, LOCALES, LocaleContext } from "shared/ui/locale/locale-context";
import { PickerLocaleContext } from "shared/ui/locale/picker-locale-context";
import { useNotification } from "shared/ui/notification";

import { useCurrentProfile } from "@/shared/model/auth";

import { profilesApi } from "@/entities/profile";

import enLocale from "date-fns/locale/en-GB";
import kkLocale from "date-fns/locale/kk";
import ruLocale from "date-fns/locale/ru";
import { DateFnsProvider } from "react-hook-form-mui/dist/date-fns";

const LOCALE_STORAGE_KEY = "locale";

type TProfileStorageConfig = { locale: LOCALES };

export const LocaleProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [storedLocale, setStoredLocale] = useStorage<TProfileStorageConfig, typeof LOCALE_STORAGE_KEY>(LOCALE_STORAGE_KEY, getBrowserLocale());
	const { profile } = useCurrentProfile();
	const { showResponseError } = useNotification();
	const [putUserLocale] = profilesApi.usePutUserLocaleMutation();
	const [optimisticLocale, setOptimisticLocale] = useState<LOCALES | null>(null);

	const profileLocale = useMemo(() => {
		return profile?.locale ? normalizeLocale(profile.locale) : null;
	}, [profile?.locale]);

	const locale = optimisticLocale || profileLocale || normalizeLocale(storedLocale);

	useEffect(() => {
		if (!optimisticLocale) return;
		if (profileLocale !== optimisticLocale) return;

		setOptimisticLocale(null);
	}, [optimisticLocale, profileLocale]);

	useEffect(() => {
		if (storedLocale !== locale) {
			setStoredLocale(locale);
		}

		if (i18n.resolvedLanguage !== locale) {
			i18n.changeLanguage(locale);
		}
	}, [locale, setStoredLocale, storedLocale]);

	const setLocale = useCallback(
		async (nextLocale: LOCALES) => {
			const normalizedNextLocale = normalizeLocale(nextLocale);

			if (normalizedNextLocale === locale) return;

			setOptimisticLocale(normalizedNextLocale);
			setStoredLocale(normalizedNextLocale);

			if (!profile) {
				setOptimisticLocale(null);
				return;
			}

			try {
				await putUserLocale({ body: { locale: normalizedNextLocale } }).unwrap();
			} catch (error) {
				setOptimisticLocale(null);
				showResponseError(error);
			}
		},
		[locale, profile, putUserLocale, setStoredLocale, showResponseError]
	);

	const dateLocale = locale === LOCALES.kk ? kkLocale : locale === LOCALES.ru ? ruLocale : enLocale;
	const pickerLocaleText: PickersInputComponentLocaleText<any> | undefined =
		locale === LOCALES.ru || locale === LOCALES.kk ? ruRU.components.MuiLocalizationProvider.defaultProps.localeText : enUS.components.MuiLocalizationProvider.defaultProps.localeText;

	return (
		<LocaleContext.Provider value={{ locale, setLocale }}>
			<PickerLocaleContext.Provider value={pickerLocaleText}>
				<DateLocaleContext.Provider value={dateLocale}>
					<DateFnsProvider adapterLocale={dateLocale}>{children}</DateFnsProvider>
				</DateLocaleContext.Provider>
			</PickerLocaleContext.Provider>
		</LocaleContext.Provider>
	);
};
