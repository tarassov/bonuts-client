import { Button, Typography } from "@mui/material";
import { FC, SyntheticEvent, useEffect } from "react";
import { usePaginator } from "../../hooks/use-paginator";
import { extendedApi } from "../../services/api/extended-api";

const EventCard: FC<{ content: string }> = ({ content }) => {
	return <div>{content}</div>;
};

const DashboardPage: FC = () => {
	const { pages, isLoading, fetchNext } = usePaginator(
		extendedApi.endpoints.getEvents,
		{
			tenant: "demo",
			showMine: "false",
			page: 1,
		}
	);
	// const { data: events, isLoading } = useGetEventsQuery(
	// 	{
	// 		tenant: "demo",
	// 		showMine: "false",
	// 		page: 1,
	// 	},
	// 	{
	// 		pollingInterval: 10000,
	// 	}
	// );
	useEffect(() => {
		extendedApi.endpoints.getEvents;
	}, []);

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
			{pages &&
				pages.map((page) => {
					return (
						page?.data &&
						page?.data?.map((item) => {
							return (
								<EventCard key={item.id} content={item.attributes.content} />
							);
						})
					);
				})}
			<Button onClick={onNext}>Next</Button>
		</>
	);
};

export default DashboardPage;
