import { useCallback, useMemo, useState } from "react";
import { InView } from "react-intersection-observer";
import { KeyboardArrowUp, LightbulbCircleOutlined } from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";

import classnames from "classnames";

import { useModal } from "@/shared/lib/modal";
import { BntBox } from "@/shared/ui/box";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { groupFeedByMonth } from "../lib/group-feed-by-month";
import { useEventListLogic } from "../model/use-event-list-logic";
import { useFeedEntrance } from "../model/use-feed-entrance";
import { useFeedNavigation } from "../model/use-feed-navigation";
import { useFeedScrollReset } from "../model/use-feed-scroll-reset";
import { usePinnedEvents } from "../model/use-pinned-events";
import { useVisibleFeedMonth } from "../model/use-visible-feed-month";

import { EventFeedFilterLoading } from "./event-feed-filter-loading";
import { EventFeedLoading } from "./event-feed-loading";
import { FeedDonutSpinner } from "./event-feed-loading.styles";
import classes from "./event-list.module.scss";
import { EventListHeader } from "./event-list-header";
import { FeedEnteringCard } from "./feed-entering-card";
import { FeedMonthMarker } from "./feed-month-marker";
import { FeedMonthNavigation } from "./feed-month-navigation";
import { BackToTopButton } from "./feed-navigation.styles";
import { PinnedEventsStrip } from "./pinned-events-strip";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_b, texts_e, texts_g, texts_l } from "@/services/localization/texts";

export function EventList() {
	const { translate } = useBntTranslate();
	const theme = useTheme();
	const matchesDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const { GiveDonut } = useModal();
	const [searchText, setSearchText] = useState<string>();
	const [showMine, setShowMine] = useState<boolean>(false);
	const { feedRef, scrollAreaRef } = useFeedScrollReset(showMine, searchText, matchesDownMd);
	const { hasNext, pages, isLoading, isChangingFilter, fetchNext } = useEventListLogic({
		showMine,
		searchText,
	});

	const { pinnedPosts } = usePinnedEvents();
	const { hasDeepScroll, scrollToTop, scrollToMonth } = useFeedNavigation(scrollAreaRef, matchesDownMd);
	const months = useMemo(() => groupFeedByMonth(pages), [pages]);
	const [monthList, setMonthList] = useState<HTMLDivElement | null>(null);
	const visibleMonth = useVisibleFeedMonth(monthList, months, scrollAreaRef, matchesDownMd, pinnedPosts.length > 0);
	// Only the feed column loads: the header, the pinned strip and the sidebar stay in place.
	const { isLeaving } = useFeedEntrance(isLoading);

	const isEmpty = !pages[0]?.length;
	const hasScrollableContent = !isEmpty || pinnedPosts.length > 0;
	const showLoader = (isLoading && isEmpty) || isLeaving;

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

	const handleMonthSelect = (key: string) => {
		const index = months.findIndex((month) => month.key === key);
		const section = monthList?.children[index];
		if (section) scrollToMonth(section);
	};

	const monthNavigation = <FeedMonthNavigation months={months} visibleMonth={visibleMonth} isRefreshing={isChangingFilter} isMobile={matchesDownMd} onSelect={handleMonthSelect} />;

	return (
		<div ref={feedRef} className={classnames("height-100", classes.feed)} data-testid="dashboard-event-list">
			<EventListHeader className={classes.feedHeader} showMine={showMine} onGiveDonutClick={handleGiveDonutClick} onSearchTextChange={setSearchText} onShowMineChange={setShowMine} />

			{matchesDownMd ? monthNavigation : null}
			<BntBox
				ref={scrollAreaRef}
				className={classnames("flex-grow pb-2 mt-3", classes.scrollArea, { scroll: hasScrollableContent })}
				sx={{ overflowY: matchesDownMd && !hasScrollableContent ? "hidden" : undefined }}
			>
				{isChangingFilter ? <EventFeedFilterLoading /> : null}
				{pinnedPosts.length > 0 ? <PinnedEventsStrip posts={pinnedPosts} /> : null}
				<div className={classes.feedBody} aria-busy={isLoading || isChangingFilter}>
					<div className={classnames(classes.feedResults, { [classes.isRefreshing]: isChangingFilter })} inert={isChangingFilter}>
						{showLoader ? <EventFeedLoading isLeaving={!isLoading && isLeaving} /> : null}
						<div ref={setMonthList} className={classnames(classes.months, { [classes.completeMonths]: !hasNext && months.some(({ date }) => date) })}>
							{months.map((group) => (
								<section key={group.key} className={classes.monthSection}>
									{group.date ? <FeedMonthMarker date={group.date} isCurrent={group.key === visibleMonth} /> : null}
									<div className={classes.monthPosts}>
										{group.posts.map(({ post, index, isFirstPage }) => (
											<FeedEnteringCard key={post.id} post={post} index={index} showInitialDrop={isLeaving && isFirstPage} scrollRoot={matchesDownMd ? null : scrollAreaRef.current} />
										))}
									</div>
								</section>
							))}
						</div>
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
				</div>
				{hasNext && pages.length > 0 && (
					<BntStack alignItems="center" justifyContent="center" className="pt-2 overflow-hidden">
						<InView as="div" onChange={handleInView}>
							<FeedDonutSpinner role="progressbar" aria-label={translate(texts_l.loading, { capitalize: true })} data-testid="event-feed-next-page" />
						</InView>
					</BntStack>
				)}
			</BntBox>
			{matchesDownMd ? null : monthNavigation}
			{hasDeepScroll ? (
				<div className={classes.backToTop}>
					<BackToTopButton color="primary" onClick={scrollToTop} aria-label={translate(texts_b.back_to_top)} title={translate(texts_b.back_to_top)}>
						<KeyboardArrowUp />
					</BackToTopButton>
				</div>
			) : null}
		</div>
	);
}
