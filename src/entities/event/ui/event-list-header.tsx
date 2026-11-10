import { RedeemOutlined } from "@mui/icons-material";

import { EventFeedFilter } from "./event-feed-filter";
import { EventFeedSearch } from "./event-feed-search";
import classes from "./event-list-header.module.scss";
import { FeedGiveButton } from "./event-list-header.styles";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_g } from "@/services/localization/texts";

type TEventListHeaderProps = {
	showMine: boolean;
	onGiveDonutClick: VoidFunction;
	onSearchTextChange: (search: string) => void;
	onShowMineChange: (isMine: boolean) => void;
};

export function EventListHeader({ showMine, onGiveDonutClick, onSearchTextChange, onShowMineChange }: TEventListHeaderProps) {
	const { translate } = useBntTranslate();

	return (
		<div className={classes.container}>
			<div className={classes.header} data-testid="event-feed-header">
				<div className={classes.filters}>
					<EventFeedFilter showMine={showMine} onShowMineChange={onShowMineChange} />
				</div>
				<EventFeedSearch onSearchTextChange={onSearchTextChange} />
				<FeedGiveButton
					data-testid="event-feed-give-button"
					variant="contained"
					disableElevation
					onClick={onGiveDonutClick}
					startIcon={<RedeemOutlined />}
					aria-label={translate(texts_g.give_donuts, { capitalize: true })}
				>
					<span className={classes.compactGiveLabel}>{translate(texts_g.give, { capitalize: true })}</span>
					<span className={classes.fullGiveLabel}>{translate(texts_g.give_donuts, { capitalize: true })}</span>
				</FeedGiveButton>
			</div>
		</div>
	);
}
