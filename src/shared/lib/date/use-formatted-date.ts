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
		(isoDate?: string, formatOptions: TFormattedDateOptions = DEFAULT_DATE_FORMAT_OPTIONS): string => {
			if (!isoDate) {
				return "";
			}

			const dateOnlyMatch = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
			const date = dateOnlyMatch ? parse(isoDate, "yyyy-MM-dd", new Date()) : parseISO(isoDate);

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
