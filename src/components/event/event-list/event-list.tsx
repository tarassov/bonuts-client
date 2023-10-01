import { Box, Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import { FC, SyntheticEvent } from "react";
import { Dictionary } from "constants/dictionary";
import { useEventListLogic } from "logic/hooks/event/use-event-list-logic";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import classnames from "classnames";
import { BntStyledEventCard } from "../event-card/event-card-styled";

export const BntEventList: FC = () => {
	const { translate } = useBntTranslate();
	const matchesBigScreen = useMediaQuery("(min-width:1980px)");
	const theme = useTheme();
	const matchesDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const { hasNext, pages, isLoading, fetchNext, hasNew, applyUpdates } = useEventListLogic({
		showMine: false,
	});

	const onNext = (e: SyntheticEvent) => {
		e.preventDefault();
		fetchNext();
	};

	useLoader(Modules.Events, isLoading);

	return (
		<Box className={classnames("scroll height-100 pb-2", { "pr-12": !matchesDownMd })}>
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
			{hasNext && pages.length > 0 && (
				<Button onClick={onNext}>{translate(Dictionary.MORE)}</Button>
			)}
		</Box>
	);
};
