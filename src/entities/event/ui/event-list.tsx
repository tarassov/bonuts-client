import { useCallback, useState } from "react";
import { InView } from "react-intersection-observer";
import { LightbulbCircleOutlined } from "@mui/icons-material";
import { Button, CircularProgress, Grid2 as Grid, useMediaQuery, useTheme } from "@mui/material";

import classnames from "classnames";

import { Dictionary } from "constants/dictionary";
import { Modules } from "constants/modules";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_e, texts_g } from "services/localization/texts";

import { present } from "@/shared/lib/type-guards";
import { BntBox } from "@/shared/ui/box";
import { useLoader } from "@/shared/ui/loader";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useModal } from "@/entities/modal";

import { useEventListLogic } from "../model/use-event-list-logic";

import { EventCardStyled } from "./event-card-styled";
import classes from "./event-list.module.scss";
import { EventListHeader } from "./event-list-header";

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

	useLoader(Modules.Events, isLoading);

	const isEmpty = !pages[0]?.length;

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
				{hasNew && <Button onClick={applyUpdates}>{Dictionary.REFRESH}</Button>}
				<Grid container rowSpacing={{ xs: 2 }} justifyContent="center">
					{present(pages) &&
						Object.values(pages).map((page) => {
							return (
								page &&
								page.map((post) => {
									return (
										<Grid key={post.id} size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center" }}>
											<EventCardStyled post={post} maxWidth={760} />
										</Grid>
									);
								})
							);
						})}
				</Grid>
				{isEmpty ? (
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
				{hasNext && pages.length > 0 && (
					<BntStack alignItems="center" justifyContent="center" className="pt-2 overflow-hidden">
						<InView as="div" onChange={handleInView}>
							<CircularProgress color="primary" />
						</InView>
					</BntStack>
				)}
			</BntBox>
		</BntStack>
	);
}
