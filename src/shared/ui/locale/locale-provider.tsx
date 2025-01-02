import { FC, useEffect, useState } from "react";
import { LocaleContext } from "shared/ui/locale/locale-context";
import enLocale from "date-fns/locale/en-US";
import { DateFnsProvider } from "react-hook-form-mui/dist/date-fns";
import {
	ruRU,
	esES,
	deDE,
	enUS,
	PickersInputComponentLocaleText,
} from "@mui/x-date-pickers/locales";
import { PickerLocaleContext } from "shared/ui/locale/picker-locale-context";

export const getDateLocale = () => navigator.language; // Intl.DateTimeFormat().resolvedOptions().locale;
export const LocaleProvider: FC<{ children: JSX.Element | Array<JSX.Element> }> = ({
	children,
}) => {
	const [locale, setLocale] = useState(enLocale);
	const [pickerLocaleText, setPickerLocaleText] = useState<
		PickersInputComponentLocaleText<any> | undefined
	>(undefined);

	useEffect(() => {
		const importLocaleFile = async () => {
			const systemLocale = getDateLocale();
			let localeToSet: any;
			switch (systemLocale) {
				case "ru":
					localeToSet = await import(`date-fns/locale/ru`);
					setPickerLocaleText(ruRU.components.MuiLocalizationProvider.defaultProps.localeText);
					break;
				case "es":
					localeToSet = await import(`date-fns/locale/es`);
					setPickerLocaleText(esES.components.MuiLocalizationProvider.defaultProps.localeText);
					break;
				case "de":
					localeToSet = await import(`date-fns/locale/de`);
					setPickerLocaleText(deDE.components.MuiLocalizationProvider.defaultProps.localeText);
					break;
				case "en-GB":
					localeToSet = await import("date-fns/locale/en-GB");
					setPickerLocaleText(enUS.components.MuiLocalizationProvider.defaultProps.localeText);
					break;
				default:
					localeToSet = enLocale;
					break;
			}
			setLocale(localeToSet.default);
		};
		importLocaleFile();
	}, []);

	return (
		<LocaleContext.Provider value={locale}>
			<PickerLocaleContext.Provider value={pickerLocaleText}>
				<DateFnsProvider adapterLocale={locale}>{children}</DateFnsProvider>
			</PickerLocaleContext.Provider>
		</LocaleContext.Provider>
	);
};
