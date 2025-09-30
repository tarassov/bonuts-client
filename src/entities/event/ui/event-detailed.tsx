import { useMediaQuery, useTheme } from "@mui/material";

import { useLoader } from "shared/ui/loader/hooks/use-loader";
import { BntStack } from "shared/ui/stack/stack";

import { Modules } from "constants/modules";

import { CommentForm } from "components/comment/comment-form";
import { CommentList } from "components/comment/comment-list";

import { useEventLoader } from "../model/use-event-loader";
import { useEventLogic } from "../model/use-event-logic";

import { EventCardStyled } from "./event-card-styled";

export function EventDetailed({ postId }: { postId?: number | string }) {
	// loading more detailed event
	const { post: detailedPost, isLoading } = useEventLoader(postId);
	const { createComment } = useEventLogic();
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	useLoader(Modules.DetailedEvent, isLoading);

	if (!detailedPost) return null;

	return (
		<BntStack
			direction="column"
			className="width-100 p-2"
			alignItems="center"
			maxWidth={600}
			width={matchesDownSm ? undefined : 500}
		>
			<EventCardStyled
				post={detailedPost}
				preventNewModal
				bodyMaxHeight={700}
				maxWidth={matchesDownSm ? undefined : 600}
			/>
			<CommentForm onSubmit={(text) => createComment(detailedPost, text)} className="width-100" />
			<CommentList comments={detailedPost.comments} className="width-100 m-1 mt-3" />
		</BntStack>
	);
}
