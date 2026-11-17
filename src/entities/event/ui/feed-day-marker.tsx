import { getFeedPeriod } from "../lib/get-feed-period";

import { DayLabel, DayMarker } from "./feed-navigation.styles";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

export function FeedDayMarker({ date }: { date: Date }) {
	const { t } = useBntTranslate();
	const { label } = getFeedPeriod(date);

	if (!label) return null;

	return (
		<DayMarker data-testid="feed-day-marker">
			<DayLabel isToday={false}>{t(label, { year: date.getFullYear() })}</DayLabel>
		</DayMarker>
	);
}
