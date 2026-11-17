import { useTranslation } from "react-i18next";

import { isToday, isYesterday } from "date-fns";

import { useFormattedDate } from "@/shared/lib/date";

import { DayLabel, DayMarker } from "./feed-navigation.styles";
import { texts_t, texts_y } from "@/services/localization/texts";

export function FeedDayMarker({ date }: { date: Date }) {
	const { t } = useTranslation();
	const { getFormattedDate } = useFormattedDate();
	const isCurrentDay = isToday(date);
	const relativeLabel = isCurrentDay ? t(texts_t.today) : isYesterday(date) ? t(texts_y.yesterday) : "";
	const formatted = getFormattedDate(date, {
		day: "numeric",
		month: "long",
		...(relativeLabel ? {} : { year: "numeric" }),
	});

	return (
		<DayMarker data-testid="feed-day-marker">
			<DayLabel isToday={isCurrentDay}>{relativeLabel ? `${relativeLabel}, ${formatted}` : formatted}</DayLabel>
		</DayMarker>
	);
}
