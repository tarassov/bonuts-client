import { useEffect, useState } from "react";

import { FeedDonutSpinner } from "./event-feed-loading.styles";
import classes from "./event-list.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_l } from "@/services/localization/texts";

export function EventFeedFilterLoading() {
	const { translate } = useBntTranslate();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setIsVisible(true), 250);

		return () => clearTimeout(timeout);
	}, []);

	if (!isVisible) return null;

	return (
		<div className={classes.refreshIndicator} role="status" aria-label={translate(texts_l.loading, { capitalize: true })} data-testid="event-feed-filter-loading">
			<FeedDonutSpinner aria-hidden />
		</div>
	);
}
