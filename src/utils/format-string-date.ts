import { format } from "date-fns";
import { CommonStrings } from "constants/dictionary";
import { ru } from "date-fns/locale";

export const formatStringDate = (date?: string, short?: boolean, locale?: Locale): string => {
	if (!date) return CommonStrings.EMPTY_STRING;
	try {
		const dateObject = new Date(date);
		const options = locale ? { locale } : { locale: ru };
		const formatOption = short ? "dd MMMM" : "dd.MM.yyyy";
		return format(dateObject, formatOption, options);
	} catch {
		return CommonStrings.EMPTY_STRING;
	}
};
