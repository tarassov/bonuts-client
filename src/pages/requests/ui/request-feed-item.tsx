import type { FC } from "react";
import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { RequestFeedActionsCell } from "./request-feed-actions-cell";
import { RequestFeedDonutCell } from "./request-feed-donut-cell";
import type { RequestFeedItemProps } from "./request-feed-item.types";
import { RequestFeedProfileCell } from "./request-feed-profile-cell";

export const RequestFeedItem: FC<RequestFeedItemProps> = ({ isMyRequestView = false, primaryAction, request, secondaryAction }) => {
	const theme = useTheme();

	return (
		<Stack
			component="article"
			direction={{ xs: "column", md: "row" }}
			gap={{ xs: 1, md: 2 }}
			alignItems={{ xs: "stretch", md: "center" }}
			justifyContent="space-between"
			sx={{
				borderBottom: `1px solid ${theme.palette.divider}`,
				px: { xs: 1.25, md: 3 },
				py: { xs: 1.25, md: 2 },
				"&:last-of-type": {
					borderBottom: "none",
				},
			}}
		>
			<Stack direction={{ xs: "column", md: "row" }} gap={{ xs: 1, md: 2.5 }} alignItems={{ xs: "flex-start", md: "center" }} sx={{ minWidth: 0, flex: 1 }}>
				{isMyRequestView ? (
					<RequestFeedDonutCell isMyRequestView request={request} />
				) : (
					<>
						<RequestFeedDonutCell request={request} />
						<RequestFeedProfileCell request={request} />
					</>
				)}
			</Stack>
			<RequestFeedActionsCell createdAt={request.created_at} primaryAction={primaryAction} secondaryAction={secondaryAction} />
		</Stack>
	);
};
