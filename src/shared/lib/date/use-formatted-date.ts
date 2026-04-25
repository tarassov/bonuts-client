import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { intlFormat, parse, parseISO } from "date-fns";

/**
 * Returns a memoized formatter for short localized dates.
 */
export const useFormattedDate = () => {
	const { i18n } = useTranslation();

	const getFormattedDate = useCallback(
		(isoDate?: string): string => {
			if (!isoDate) {
				return "";
			}

			const dateOnlyMatch = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
			const date = dateOnlyMatch ? parse(isoDate, "yyyy-MM-dd", new Date()) : parseISO(isoDate);

			if (Number.isNaN(date.getTime())) {
				return "";
			}

			return intlFormat(
				date,
				{
					day: "2-digit",
					month: "short",
					year: "numeric",
				},
				{
					...(i18n.language ? { locale: i18n.language } : {}),
				}
			);
		},
		[i18n.language]
	);

	return { getFormattedDate };
};
