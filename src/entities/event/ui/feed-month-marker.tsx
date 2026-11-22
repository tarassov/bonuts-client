import { useTranslation } from "react-i18next";

import { formatFeedMonth } from "../lib/group-feed-by-month";

import classes from "./event-list.module.scss";
import { FeedMonthHeading } from "./feed-navigation.styles";

export function FeedMonthMarker({ date, isCurrent }: { date: Date; isCurrent: boolean }) {
	const { i18n } = useTranslation();

	return (
		<FeedMonthHeading className={classes.monthHeading} aria-current={isCurrent ? "true" : undefined} data-testid="feed-month-marker">
			{formatFeedMonth(date, i18n.language)}
		</FeedMonthHeading>
	);
}
