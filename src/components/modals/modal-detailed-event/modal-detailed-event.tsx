import { FC } from "react";
import { TModalProps } from "shared/types/dialog-types";
import { EventDetailed } from "components/event/event-card/event-detailed";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { TPost } from "@/types/model/post";

export type ModalDetailedEventProps = {
	post: TPost;
};
export const ModalDetailedEvent: FC<ModalDetailedEventProps & TModalProps> = ({ post }) => {
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<Box sx={{ width: matchesDownSm ? "100%" : 500, minHeight: 400 }}>
			<EventDetailed postId={post.id} />
		</Box>
	);
};
