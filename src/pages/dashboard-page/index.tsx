import { Button, Typography } from "@mui/material";
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

const EventCard: FC<{ content: string; id: string }> = ({ content, id }) => {
	return (
		<div>
			{id}::{content}
		</div>
	);
};

const Index: FC = () => {
	const { paginatedPages, pages, isLoading, fetchNext, hasNew, applyUpdates } =
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
		pages.forEach((p) => {
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
		<>
			<Typography>Dashboard</Typography>
			{hasNew && <Button onClick={applyUpdates}>{Dictionary.REFRESH}</Button>}
			{pages &&
				pages.map((page) => {
					const data = apiTranslator.toPosts(page);
					return (
						data &&
						data.map((post) => {
							return <BNTStyledEventCard key={post.id} post={post} />;
						})
					);
				})}
			<Button onClick={onNext}>Next</Button>
		</>
	);
};

export default Index;
