import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { intlFormat, parse, parseISO } from "date-fns";

type TFormattedDateOptions = Parameters<typeof intlFormat>[1];

const DEFAULT_DATE_FORMAT_OPTIONS: TFormattedDateOptions = {
	day: "2-digit",
	month: "short",
	year: "numeric",
};

/**
 * Returns a memoized formatter for localized dates.
 *
 * @example
 * getFormattedDate("2026-07-23T20:45:00Z", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
 */
export const useFormattedDate = () => {
	const { i18n } = useTranslation();

	const getFormattedDate = useCallback(
		(value?: string | Date, formatOptions: TFormattedDateOptions = DEFAULT_DATE_FORMAT_OPTIONS): string => {
			if (!value) {
				return "";
			}

			let date: Date;
			if (typeof value === "string") {
				const dateOnlyMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
				date = dateOnlyMatch ? parse(value, "yyyy-MM-dd", new Date()) : parseISO(value);
			} else {
				date = value;
			}

			if (Number.isNaN(date.getTime())) {
				return "";
			}

			return intlFormat(date, formatOptions, {
				...(i18n.language ? { locale: i18n.language } : {}),
			});
		},
		[i18n.language]
	);

	return { getFormattedDate };
};
