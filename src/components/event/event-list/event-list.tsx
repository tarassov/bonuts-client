import {
	Button,
	Checkbox,
	CircularProgress,
	FormControlLabel,
	Grid,
	useMediaQuery,
	useTheme,
} from "@mui/material";

import React, { FC, useState } from "react";
import { Dictionary } from "constants/dictionary";
import { useEventListLogic } from "logic/hooks/event/use-event-list-logic";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import classnames from "classnames";
import { BntTypography } from "shared/typography/typography";
import { texts_e, texts_s } from "services/localization/texts";
import { BntStack } from "shared/stack/stack";
import { LightbulbCircleOutlined } from "@mui/icons-material";
import { SearchString } from "components/search-string/search-string";
import { InView } from "react-intersection-observer";
import { BntStyledEventCard } from "../event-card/event-card-styled";
import { BntBox } from "@/shared/box/bnt-box";

export const BntEventList: FC = () => {
	const { translate } = useBntTranslate();
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
											<BntStyledEventCard post={post} />
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
						<BntTypography>
							{translate(texts_e.empty_events_placeholder, { capitalize: true })}
						</BntTypography>
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
};
