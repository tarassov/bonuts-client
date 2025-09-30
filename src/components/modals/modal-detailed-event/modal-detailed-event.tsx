import { useMediaQuery, useTheme } from "@mui/material";
import { TModalProps } from "shared/ui/types/dialog-types";

import { BntBox } from "shared/ui/box/bnt-box";

import { EventDetailed } from "@/entities/event/ui/event-detailed";
import { TPost } from "@/types/model/post";

export type ModalDetailedEventProps = {
	post: TPost;
};
export function ModalDetailedEvent({ post }: ModalDetailedEventProps & TModalProps) {
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<BntBox sx={{ width: matchesDownSm ? "100%" : 600, minHeight: 400 }}>
			<EventDetailed postId={post.id} />
		</BntBox>
	);
}
