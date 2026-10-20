import { FEED_DONUTS_COUNT } from "../config/feed-motion";

import { FeedLoadingCaption, FeedLoadingDonut, FeedLoadingDonuts, FeedLoadingRing, FeedLoadingRoot, FeedLoadingShadow } from "./event-feed-loading.styles";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_g } from "@/services/localization/texts";

const donuts = Array.from({ length: FEED_DONUTS_COUNT }, (_, index) => index);

type TEventFeedLoadingProps = {
	// the data has arrived: the donuts float away while the cards drop in behind them
	isLeaving?: boolean;
	className?: string;
};

// Loading state of the recognition feed: three bouncing donuts instead of a spinner.
export function EventFeedLoading({ isLeaving = false, className }: TEventFeedLoadingProps) {
	const { translate } = useBntTranslate();

	return (
		<FeedLoadingRoot role="status" aria-live="polite" aria-busy={!isLeaving} isLeaving={isLeaving} className={className} data-testid="event-feed-loading">
			<FeedLoadingDonuts aria-hidden>
				{donuts.map((index) => (
					<FeedLoadingDonut key={index}>
						<FeedLoadingRing index={index}>
							<span />
							<span />
							<span />
						</FeedLoadingRing>
						<FeedLoadingShadow index={index} />
					</FeedLoadingDonut>
				))}
			</FeedLoadingDonuts>
			<FeedLoadingCaption variant="body2">{translate(texts_g.gathering_appreciation, { capitalize: true })}</FeedLoadingCaption>
		</FeedLoadingRoot>
	);
}
