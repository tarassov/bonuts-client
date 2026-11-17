import { isSameDay, startOfMonth, startOfWeek, startOfYear, subDays, subMonths, subWeeks } from "date-fns";

import { texts_e, texts_i, texts_l, texts_y } from "@/services/localization/texts";

export function getFeedPeriod(date: Date, now = new Date()) {
	if (isSameDay(date, now)) return { key: "today", label: null };
	if (isSameDay(date, subDays(now, 1))) return { key: "yesterday", label: texts_y.yesterday };
	if (date >= startOfWeek(now, { weekStartsOn: 1 })) return { key: "this-week", label: texts_e.earlier_this_week };
	if (date >= startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 })) return { key: "last-week", label: texts_l.last_week };
	if (date >= startOfMonth(now)) return { key: "this-month", label: texts_e.earlier_this_month };
	if (date >= startOfMonth(subMonths(now, 1))) return { key: "last-month", label: texts_l.last_month };
	if (date >= startOfYear(now)) return { key: "this-year", label: texts_e.earlier_this_year };
	if (date.getFullYear() === now.getFullYear() - 1) return { key: "last-year", label: texts_l.last_year };

	return { key: `year-${date.getFullYear()}`, label: texts_i.in_year };
}
