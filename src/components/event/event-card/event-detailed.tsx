import { FC } from "react";
import { BntStyledEventCard } from "components/event/event-card/event-card-styled";
import { useEventLoader } from "logic/hooks/event/use-event-loader";
import { useLoader } from "shared/ui/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { BntStack } from "shared/ui/stack/stack";
import { CommentList } from "components/comment/comment-list";
import { CommentForm } from "components/comment/comment-form";
import { useEventLogic } from "logic/hooks/event/use-event-logic";
import { useMediaQuery, useTheme } from "@mui/material";

export const EventDetailed: FC<{ postId?: number | string }> = ({ postId }) => {
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
			<BntStyledEventCard
				post={detailedPost}
				preventNewModal
				bodyMaxHeight={700}
				maxWidth={matchesDownSm ? undefined : 600}
			/>
			<CommentForm onSubmit={(text) => createComment(detailedPost, text)} className="width-100" />
			<CommentList comments={detailedPost.comments} className="width-100 m-1 mt-3" />
		</BntStack>
	);
};
