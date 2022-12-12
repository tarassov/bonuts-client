import { Button, Typography } from "@mui/material";
import { FC, SyntheticEvent } from "react";
import { usePaginator } from "../../hooks/use-paginator";
import { extendedApi } from "../../services/api/extended-api";

const EventCard: FC<{ content: string; id: string }> = ({ content, id }) => {
	return (
		<div>
			{id}::{content}
		</div>
	);
};

const DashboardPage: FC = () => {
	const { pages, isLoading, fetchNext, hasNew, applyUpdates } = usePaginator(
		extendedApi.endpoints.getEvents,
		{
			tenant: "demo",
			showMine: "false",
			page: 1,
		},
		10000
	);

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
			{hasNew && <Button onClick={applyUpdates}>Обновить</Button>}
			{pages &&
				pages.map((page) => {
					return (
						page?.data &&
						page?.data?.map((item) => {
							return (
								<EventCard
									key={item.id}
									content={item.attributes.content}
									id={item.id}
								/>
							);
						})
					);
				})}
			<Button onClick={onNext}>Next</Button>
		</>
	);
};

export default DashboardPage;
