import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { getDefaultLocale } from "@/shared/config/locale";

import { enLocale } from "@/services/localization/en/en-locale";
import { kkLocale } from "@/services/localization/kk/kk-locale";
import { ruLocale } from "@/services/localization/ru/ru-locale";

i18n.use(LanguageDetector).init({
	resources: {
		en: enLocale,
		ru: ruLocale,
		kk: kkLocale,
	},
	fallbackLng: getDefaultLocale(),
	debug: import.meta.env.DEV,

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
