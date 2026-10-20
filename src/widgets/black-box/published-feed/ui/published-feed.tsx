import type { FC } from "react";
import { PublicOutlined } from "@mui/icons-material";

import { BntStack } from "@/shared/ui/stack";

import { AnswerView, blackBoxTexts, QuestionCard, type TBlackBoxQuestion } from "@/entities/black-box";

import { EmptyFeed, FeedCount, FeedHeader, FeedSubtitle, FeedTitle } from "./published-feed.styles";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

type TPublishedFeedProps = {
	questions: Array<TBlackBoxQuestion>;
};

/** The heart of the black box page: answered questions, visible to the whole team. */
export const PublishedFeed: FC<TPublishedFeedProps> = ({ questions }) => {
	const { t } = useBntTranslate();

	return (
		<BntStack component="section" direction="column" gap={2}>
			<FeedHeader>
				<BntStack direction="column" gap={0.5}>
					<FeedTitle>{t(blackBoxTexts.published_answers)}</FeedTitle>
					<FeedSubtitle>
						<PublicOutlined />
						{t(blackBoxTexts.visible_to_team)}
					</FeedSubtitle>
				</BntStack>
				<FeedCount>{t(blackBoxTexts.answers_count, { count: questions.length })}</FeedCount>
			</FeedHeader>
			{questions.length ? null : <EmptyFeed>{t(blackBoxTexts.no_published_answers)}</EmptyFeed>}
			{questions.map((question) => (
				<QuestionCard key={question.id} question={question}>
					{question.answer ? <AnswerView answer={question.answer} /> : null}
				</QuestionCard>
			))}
		</BntStack>
	);
};
