import type { Locale } from "date-fns";
import { format, lightFormat } from "date-fns";

import { ru } from "date-fns/locale";
import { CommonStrings } from "@/constants/dictionary";

/**
 * Formats an incoming date-like string into a localized UI string.
 * Supports short/full date modes and optional time-only or date+time output.
 */
export const formatStringDate = (date?: string | null, short?: boolean, useTime?: boolean, locale?: Locale, onlyTime?: boolean, utc?: boolean): string => {
	if (!date) return CommonStrings.EMPTY_STRING;

	try {
		const dateObject = new Date(date);
		const options = locale ? { locale } : { locale: ru };
		let formatOption = short ? "dd MMMM" : "dd.MM.yyyy";

		if (useTime || onlyTime) {
			formatOption = onlyTime ? "HH:mm" : `${formatOption} HH:mm`;
		}

		if (onlyTime && utc) {
			const utcDate = new Date();
			utcDate.setHours(dateObject.getUTCHours());
			utcDate.setMinutes(dateObject.getUTCMinutes());

			return lightFormat(utcDate, formatOption);
		}

		return format(dateObject, formatOption, options);
	} catch {
		return CommonStrings.EMPTY_STRING;
	}
};
