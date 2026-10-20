import type { FC } from "react";

import { BntTypography } from "@/shared/ui/typography";

import { AnswerView, blackBoxTexts, type TBlackBoxQuestion } from "@/entities/black-box";

import { useBntTranslate } from "@/hooks/use-bnt-translate";

type TQuestionAnswerStateProps = {
	question: TBlackBoxQuestion;
};

export const QuestionAnswerState: FC<TQuestionAnswerStateProps> = ({ question }) => {
	const { t } = useBntTranslate();

	if (!question.answer) {
		return (
			<BntTypography variant="body2" color="text.secondary">
				{t(blackBoxTexts.question_link_waiting)}
			</BntTypography>
		);
	}

	return <AnswerView answer={question.answer} />;
};
