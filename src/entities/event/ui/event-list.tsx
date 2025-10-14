import React, { useState } from "react";
import { InView } from "react-intersection-observer";
import { LightbulbCircleOutlined } from "@mui/icons-material";
import { Button, Checkbox, CircularProgress, FormControlLabel, Grid, useMediaQuery, useTheme } from "@mui/material";
import classnames from "classnames";

import { BntBox } from "shared/ui/box/bnt-box";
import { useLoader } from "shared/ui/loader/hooks/use-loader";
import { BntStack } from "shared/ui/stack";
import { BntTypography } from "shared/ui/typography/typography";

import { Dictionary } from "constants/dictionary";
import { Modules } from "constants/modules";

import { texts_e, texts_s } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { SearchString } from "components/search-string/search-string";

import { EventCardStyled } from "./event-card-styled";

import { useEventListLogic } from "@/entities/event/model/use-event-list-logic";

export function EventList() {
	const { translate } = useBntTranslate();
	// todo: refactor or extract constant
	const matchesBigScreen = useMediaQuery("(min-width:1980px)");
	const theme = useTheme();
	const matchesDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const [searchText, setSearchText] = useState<string>();
	const [showMine, setShowMine] = useState<boolean>(false);
	const { hasNext, pages, isLoading, fetchNext, hasNew, applyUpdates } = useEventListLogic({
		showMine,
		searchText,
	});

	useLoader(Modules.Events, isLoading);

	const isEmpty = !pages[0]?.length;

	return (
		<BntStack direction="column" className={classnames("height-100")}>
			<BntStack direction="row" gap={2} justifyContent="space-bwteen" alignItems="center">
				{pages.length > 0 ? (
					<>
						<SearchString setSearch={setSearchText} debounceDelay={500} className="flex-grow" />
						<FormControlLabel
							control={<Checkbox />}
							label={translate(texts_s.show_only_mine)}
							onChange={(_, value) => {
								setShowMine(value);
							}}
						/>
					</>
				) : null}
			</BntStack>

			<BntBox
				className={classnames("flex-grow pb-2 mt-2", {
					"pr-3": !matchesDownMd,
					scroll: !isEmpty,
				})}
				sx={{
					overflowY: matchesDownMd && isEmpty ? "hidden" : undefined,
				}}
			>
				{hasNew && <Button onClick={applyUpdates}>{Dictionary.REFRESH}</Button>}
				<Grid container rowSpacing={{ xs: 2 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
					{pages.length > 0 &&
						Object.values(pages).map((page) => {
							return (
								page &&
								page.map((post) => {
									return (
										<Grid item key={post.id} xs={12} sm={12} md={6} lg={matchesBigScreen ? 4 : 6}>
											<EventCardStyled post={post} />
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
						<InView
							as="div"
							onChange={(inView) => {
								if (inView && !isLoading) {
									fetchNext();
								}
							}}
						>
							<CircularProgress color="primary" />
						</InView>
					</BntStack>
				)}
			</BntBox>
		</BntStack>
	);
}
