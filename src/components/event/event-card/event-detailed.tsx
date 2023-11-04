import { FC } from "react";
import { BntStyledEventCard } from "components/event/event-card/event-card-styled";
import { useEventLoader } from "logic/hooks/event/use-event-loader";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { BntStack } from "shared/stack/stack";
import { CommentList } from "components/comment/comment-list";
import { TPost } from "@/types/model/post";

export const EventDetailed: FC<{ post: TPost }> = ({ post }) => {
	// loading more detailed event
	const { post: detailedPost, isLoading } = useEventLoader(post.id);

	useLoader(Modules.DetailedEvent, isLoading);

	if (!detailedPost) return null;

	return (
		<BntStack direction="column">
			<BntStyledEventCard post={detailedPost} preventNewModal />
			<CommentList comments={detailedPost.comments} />
		</BntStack>
	);
};
