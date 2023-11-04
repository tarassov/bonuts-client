import { FC } from "react";
import { BntStack } from "shared/stack/stack";
import { CommentCardStyled } from "components/comment/comment-card/comment-card-styled";
import { TComment } from "@/types/model/comment";

export const CommentList: FC<{ comments: Array<TComment> }> = ({ comments }) => {
	return (
		<BntStack direction="column">
			{comments.map((comment) => {
				return <CommentCardStyled comment={comment} key={comment.id} />;
			})}
		</BntStack>
	);
};
