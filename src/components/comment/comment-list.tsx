import { FC } from "react";
import { BntStack } from "shared/ui/stack/stack";
import { CommentCardStyled } from "components/comment/comment-card/comment-card-styled";
import { TComment } from "@/types/model/comment";

export const CommentList: FC<{ comments: Array<TComment>; className?: string }> = ({
	comments,
	className,
}) => {
	return (
		<BntStack direction="column" className={className} alignItems="center" gap={1}>
			{comments.map((comment) => {
				return <CommentCardStyled comment={comment} key={comment.id} />;
			})}
		</BntStack>
	);
};
