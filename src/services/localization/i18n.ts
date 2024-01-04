import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import * as process from "process";

import { ruLocale } from "services/localization/ru/ru-locale";

i18n.use(LanguageDetector).init({
	resources: {
		en: {
			translations: {
				Events: "Events",

				Balance: "Balance",

				"Confirmation email was sent to": "Confirmation email was sent to",
				Confirm: "Confirm email",

				Dashboard: "Dashboard",

				"invitation added": "Invitation added",
				"Registration Confirmation": "Registration Confirmation",
				"regard added": "New donuts has been bought",
				"name has been taken": "NAME HAS BEEN TAKEN",
				"Log in": "Log in",
				Sign_In: "Sign In",
				Sign_Out: "Sign Out",
				Sign_Up: "Sign Up",
				"Recover password": "Recover password",

				// CONSTS
				CONST_GREETINGS:
					"Fast and simple way to   encourage your colleagues and thank them for their patience and help.",
			},
		},
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
