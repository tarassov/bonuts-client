import { format } from "date-fns";
import { CommonStrings } from "constants/dictionary";
import { ru } from "date-fns/locale";

export const formatStringDate = (
	date?: string,
	short?: boolean,
	useTime?: boolean,
	locale?: Locale
): string => {
	if (!date) return CommonStrings.EMPTY_STRING;
	try {
		const dateObject = new Date(date);
		const options = locale ? { locale } : { locale: ru };
		let formatOption = short ? "dd MMMM" : "dd.MM.yyyy";
		if (useTime) formatOption = `${formatOption} HH:mm`;
		return format(dateObject, formatOption, options);
	} catch {
		return CommonStrings.EMPTY_STRING;
	}
};
