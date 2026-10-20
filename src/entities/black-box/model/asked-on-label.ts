import { differenceInCalendarDays, parse } from "date-fns";

import blackBoxTexts from "../config/black-box-texts";

/** Up to this many days the label says "N days ago"; older questions show the date. */
const RELATIVE_DAYS_LIMIT = 6;

export type TAskedOnLabel = { key: blackBoxTexts; count?: number } | { date: string };

/** A question keeps only the day it was asked, so the label is a day, never a time. */
export const getAskedOnLabel = (askedOn: string, today: Date): TAskedOnLabel => {
	const days = differenceInCalendarDays(today, parse(askedOn, "yyyy-MM-dd", today));

	if (days <= 0) return { key: blackBoxTexts.asked_today };
	if (days === 1) return { key: blackBoxTexts.asked_yesterday };
	if (days <= RELATIVE_DAYS_LIMIT) return { key: blackBoxTexts.asked_days_ago, count: days };

	return { date: askedOn };
};
