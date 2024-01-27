import { format, lightFormat } from "date-fns";
import { CommonStrings } from "constants/dictionary";
import { ru } from "date-fns/locale";

export const formatStringDate = (
	date?: string,
	short?: boolean,
	useTime?: boolean,
	locale?: Locale,
	onlyTime?: boolean,
	utc?: boolean
): string => {
	if (!date) return CommonStrings.EMPTY_STRING;
	try {
		const dateObject = new Date(date);
		const options = locale ? { locale } : { locale: ru };
		let formatOption = short ? "dd MMMM" : "dd.MM.yyyy";
		if (useTime || onlyTime) formatOption = onlyTime ? "HH:mm" : `${formatOption} HH:mm`;
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
