import { useMediaQuery, useTheme } from "@mui/material";

import { BntBox } from "@/shared/ui/box";
import { TDialogProps } from "@/shared/ui/dialog";

import { EventDetailed } from "@/entities/event";

import { TPost } from "@/types/model/post";

export type ModalDetailedEventProps = {
	post: TPost;
};
export function ModalDetailedEvent({ post }: ModalDetailedEventProps & TDialogProps) {
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<BntBox sx={{ width: matchesDownSm ? "100%" : 600, minHeight: 400 }}>
			<EventDetailed postId={post.id} />
		</BntBox>
	);
}
