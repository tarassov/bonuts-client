import { FC, useEffect, useState } from "react";
import { LocaleContext } from "shared/locale/locale-context";
import enLocale from "date-fns/locale/en-US";
import { DateFnsProvider } from "react-hook-form-mui/dist/date-fns";

export const getDateLocale = () => navigator.language; // Intl.DateTimeFormat().resolvedOptions().locale;
export const LocaleProvider: FC<{ children: JSX.Element | Array<JSX.Element> }> = ({
	children,
}) => {
	const [locale, setLocale] = useState(enLocale);

	useEffect(() => {
		const importLocaleFile = async () => {
			const systemLocale = getDateLocale();
			let localeToSet: any;
			switch (systemLocale) {
				case "ru":
					localeToSet = await import(`date-fns/locale/ru`);
					break;
				case "es":
					localeToSet = await import(`date-fns/locale/es`);
					break;
				case "de":
					localeToSet = await import(`date-fns/locale/de`);
					break;
				case "en-GB":
					localeToSet = await import("date-fns/locale/en-GB");
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
			<DateFnsProvider adapterLocale={locale}>{children}</DateFnsProvider>
		</LocaleContext.Provider>
	);
};
