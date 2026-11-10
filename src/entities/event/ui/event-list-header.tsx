import { RedeemOutlined } from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";

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
	const theme = useTheme();
	const isNarrow = useMediaQuery(theme.breakpoints.down("sm"));

	return (
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
				{translate(isNarrow ? texts_g.give : texts_g.give_donuts, { capitalize: true })}
			</FeedGiveButton>
		</div>
	);
}
