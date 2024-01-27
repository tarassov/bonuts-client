import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import * as process from "process";

import { ruLocale } from "services/localization/ru/ru-locale";
import { enLocale } from "services/localization/en/en-locale";

i18n.use(LanguageDetector).init({
	resources: {
		en: enLocale,
		ru: ruLocale,
	},
	fallbackLng: "en",
	debug: !process.env.NODE_ENV || process.env.NODE_ENV === "development",

	// have a common namespace used around the full app
	ns: ["translations"],
	defaultNS: "translations",

	keySeparator: false, // we use content as keys

	interpolation: {
		escapeValue: false, // not needed for react!!
		formatSeparator: ",",
	},
});

export default i18n;
