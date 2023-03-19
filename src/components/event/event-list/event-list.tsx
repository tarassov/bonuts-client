import { Box, Button, Grid, Typography } from "@mui/material";
import { FC, SyntheticEvent, useEffect } from "react";
import { BntStyledEventCard } from "../event-card/event-card-styled";
import { Dictionary } from "../../../constants/dictionary";
import { useEventListLogic } from "../../../logic/hooks/use-event-list-logic";
import { useBntTranslate } from "../../../hooks/use-bnt-translate";
import { useLoader } from "../../../base/loader/hooks/use-loader";
import { Modules } from "../../../constants/modules";

export const BntEventList: FC = () => {
	const { translate } = useBntTranslate();
	const { hasNext, pages, isLoading, fetchNext, hasNew, applyUpdates } =
		useEventListLogic({ showMine: false });

	const { setLoading } = useLoader();
	const onNext = (e: SyntheticEvent) => {
		e.preventDefault();
		fetchNext();
	};

	useEffect(() => {
		setLoading(Modules.Events, isLoading);
	}, [isLoading]);

	return (
		<Box ml={2} mt={2}>
			{hasNew && <Button onClick={applyUpdates}>{Dictionary.REFRESH}</Button>}
			<Grid
				container
				rowSpacing={{ xs: 2 }}
				columnSpacing={{ xs: 1, sm: 2, md: 3 }}
			>
				{pages.length > 0 &&
					Object.values(pages).map((page) => {
						return (
							page &&
							page.map((post) => {
								return (
									<Grid item key={post.id} xs={12} sm={12} md={6}>
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
