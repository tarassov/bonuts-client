import { FC } from "react";
import { BntStyledEventCard } from "components/event/event-card/event-card-styled";
import { useEventLoader } from "logic/hooks/event/use-event-loader";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { BntStack } from "shared/stack/stack";
import { CommentList } from "components/comment/comment-list";
import { CommentForm } from "components/comment/comment-form";
import { useEventLogic } from "logic/hooks/event/use-event-logic";

export const EventDetailed: FC<{ postId?: number | string }> = ({ postId }) => {
	// loading more detailed event
	const { post: detailedPost, isLoading } = useEventLoader(postId);
	const { createComment } = useEventLogic();

	useLoader(Modules.DetailedEvent, isLoading);

	if (!detailedPost) return null;

	return (
		<BntStack direction="column" className="width-100 p-2" alignItems="center" maxWidth={600}>
			<BntStyledEventCard post={detailedPost} preventNewModal bodyMaxHeight={700} />
			<CommentForm onSubmit={(text) => createComment(detailedPost, text)} className="width-100" />
			<CommentList comments={detailedPost.comments} className="width-100 m-1 mt-3" />
		</BntStack>
	);
};
