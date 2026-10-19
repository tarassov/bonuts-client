import { useCallback, useState } from "react";
import { InView } from "react-intersection-observer";
import { LightbulbCircleOutlined } from "@mui/icons-material";
import { Button, Grid2 as Grid, useMediaQuery, useTheme } from "@mui/material";

import classnames from "classnames";

import { Dictionary } from "constants/dictionary";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_e, texts_g, texts_l } from "services/localization/texts";

import { useModal } from "@/shared/lib/modal";
import { present } from "@/shared/lib/type-guards";
import { BntBox } from "@/shared/ui/box";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useEventListLogic } from "../model/use-event-list-logic";
import { useFeedEntrance } from "../model/use-feed-entrance";
import { usePinnedEvents } from "../model/use-pinned-events";

import { EventCardStyled } from "./event-card-styled";
import { EventFeedLoading } from "./event-feed-loading";
import { FeedCardEntrance, FeedDonutSpinner } from "./event-feed-loading.styles";
import classes from "./event-list.module.scss";
import { EventListHeader } from "./event-list-header";
import { PinnedEventsStrip } from "./pinned-events-strip";

export function EventList() {
	const { translate } = useBntTranslate();
	const theme = useTheme();
	const matchesDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const { GiveDonut } = useModal();
	const [searchText, setSearchText] = useState<string>();
	const [showMine, setShowMine] = useState<boolean>(false);
	const { hasNext, pages, isLoading, fetchNext, hasNew, applyUpdates } = useEventListLogic({
		showMine,
		searchText,
	});

	const { pinnedPosts } = usePinnedEvents();
	// Only the feed column loads: the header, the pinned strip and the sidebar stay in place.
	const { generation, isLeaving, isAnimated } = useFeedEntrance(isLoading);

	const isEmpty = !pages[0]?.length;
	const showLoader = (isLoading && isEmpty) || isLeaving;

	const handleShowMineToggle = () => {
		setShowMine((prev) => !prev);
	};

	const handleGiveDonutClick = () => {
		GiveDonut.show({
			title: translate(texts_g.give_donut_delivery_title, { capitalize: true }),
		});
	};

	const handleInView = useCallback(
		(inView: boolean) => {
			if (inView && !isLoading) fetchNext();
		},
		[fetchNext, isLoading]
	);

	return (
		<BntStack direction="column" className={classnames("height-100")} data-testid="dashboard-event-list">
			<EventListHeader hasEvents={pages.length > 0} showMine={showMine} onGiveDonutClick={handleGiveDonutClick} onSearchTextChange={setSearchText} onShowMineToggle={handleShowMineToggle} />

			<BntBox className={classnames("flex-grow pb-2 mt-2", classes.scrollArea, { scroll: !isEmpty })} sx={{ overflowY: matchesDownMd && isEmpty ? "hidden" : undefined }}>
				{pinnedPosts.length > 0 ? <PinnedEventsStrip posts={pinnedPosts} /> : null}
				{hasNew && <Button onClick={applyUpdates}>{Dictionary.REFRESH}</Button>}
				<div className={classes.feedBody}>
					{showLoader ? <EventFeedLoading isLeaving={!isLoading && isLeaving} /> : null}
					<Grid key={generation} container rowSpacing={{ xs: 2 }} justifyContent="center">
						{present(pages) &&
							Object.values(pages).map((page, pageIndex) => {
								return (
									page &&
									page.map((post, postIndex) => {
										return (
											<Grid key={post.id} size={{ xs: 12 }}>
												<FeedCardEntrance index={postIndex} isAnimated={isAnimated && pageIndex === 0}>
													<EventCardStyled post={post} maxWidth={760} />
												</FeedCardEntrance>
											</Grid>
										);
									})
								);
							})}
					</Grid>
					{!isLoading && isEmpty ? (
						<BntStack
							alignItems="center"
							justifyContent="center"
							sx={{
								height: matchesDownMd ? "300px" : "40%",
								overflowY: matchesDownMd ? "hidden" : undefined,
							}}
						>
							<LightbulbCircleOutlined sx={{ height: "100px", width: "100px" }} />
							<BntTypography>{translate(texts_e.empty_events_placeholder, { capitalize: true })}</BntTypography>
						</BntStack>
					) : null}
				</div>
				{hasNext && pages.length > 0 && (
					<BntStack alignItems="center" justifyContent="center" className="pt-2 overflow-hidden">
						<InView as="div" onChange={handleInView}>
							<FeedDonutSpinner role="progressbar" aria-label={translate(texts_l.loading, { capitalize: true })} data-testid="event-feed-next-page" />
						</InView>
					</BntStack>
				)}
			</BntBox>
		</BntStack>
	);
}
