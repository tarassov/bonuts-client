import { Typography } from "@mui/material";
import { FC } from "react";
import { useGetEventsQuery } from "../../services/store/bonuts-api";

const EventCard: FC<{ content: string }> = ({ content }) => {
	return <div>{content}</div>;
};

const DashboardPage: FC = () => {
	const { data: events, isLoading } = useGetEventsQuery(
		{
			tenant: "demo",
			showMine: "false",
			page: 1,
		},
		{
			pollingInterval: 10000,
		}
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Typography>Dashboard</Typography>
			{events?.data &&
				events?.data?.map((item) => {
					return <EventCard key={item.id} content={item.attributes.content} />;
				})}
		</>
	);
};

export default DashboardPage;
