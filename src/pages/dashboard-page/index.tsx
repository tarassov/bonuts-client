import { Box, Button, Grid, Typography } from "@mui/material";
import { FC, SyntheticEvent, useEffect } from "react";
import { usePaginator } from "../../hooks/use-paginator";
import { extendedApi } from "../../services/api/extended-api";
import { Dictionary } from "../../constants/dictionary";
import {
	GetEventsApiArg,
	GetEventsApiResponse,
} from "../../services/api/bonuts-api";
import { apiTranslator } from "../../services/translator";
import { BNTEventCard } from "../../components/event-card/event-card";
import { BNTStyledEventCard } from "../../components/event-card";

const Index: FC = () => {
	const { hasNext, pages, isLoading, fetchNext, hasNew, applyUpdates } =
		usePaginator(
			extendedApi.endpoints.getEvents,
			{
				tenant: "demo",
				showMine: "false",
				page: 1,
			},
			10000
		);
	useEffect(() => {
		if (!pages) return;
		Object.values(pages).forEach((p) => {
			const items = p.data || [];
			items.forEach((i) => {});
		});
	}, [pages]);

	const onNext = (e: SyntheticEvent) => {
		e.preventDefault();
		fetchNext();
	};
	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Box ml={2} mt={2}>
			{hasNew && <Button onClick={applyUpdates}>{Dictionary.REFRESH}</Button>}
			<Grid
				container
				rowSpacing={{ xs: 2 }}
				columnSpacing={{ xs: 1, sm: 2, md: 3 }}
			>
				{pages &&
					Object.values(pages).map((page) => {
						const data = apiTranslator.toPosts(page);
						return (
							data &&
							data.map((post) => {
								return (
									<Grid item key={post.id} xs={12} sm={12} md={6}>
										<BNTStyledEventCard post={post} />
									</Grid>
								);
							})
						);
					})}
			</Grid>
			{hasNext && <Button onClick={onNext}>Next</Button>}
		</Box>
	);
};

export default Index;
