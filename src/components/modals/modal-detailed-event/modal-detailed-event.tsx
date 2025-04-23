import { FC } from "react";
import { TModalProps } from "shared/ui/types/dialog-types";
import { EventDetailed } from "components/event/event-card/event-detailed";
import { useMediaQuery, useTheme } from "@mui/material";
import { BntBox } from "shared/ui/box/bnt-box";
import { TPost } from "@/types/model/post";

export type ModalDetailedEventProps = {
	post: TPost;
};
export const ModalDetailedEvent: FC<ModalDetailedEventProps & TModalProps> = ({ post }) => {
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<BntBox sx={{ width: matchesDownSm ? "100%" : 600, minHeight: 400 }}>
			<EventDetailed postId={post.id} />
		</BntBox>
	);
};
