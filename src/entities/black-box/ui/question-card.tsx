import type { FC, ReactNode } from "react";
import { VisibilityOffOutlined } from "@mui/icons-material";

import blackBoxTexts from "../config/black-box-texts";
import { BlackBoxQuestionStatus, type TBlackBoxQuestion } from "../model/black-box.types";
import { useAskedOnLabel } from "../model/use-asked-on-label";

import { AnonymousLine, MetaDot, QuestionBody, QuestionCardRoot, QuestionHead, QuestionMeta, QuestionText } from "./question-card.styles";
import { QuestionStatusChip } from "./question-status-chip";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

type TQuestionCardProps = {
	question: TBlackBoxQuestion;
	/** The answer or the composer under the question; the card shows only the question without it. */
	children?: ReactNode;
};

export const QuestionCard: FC<TQuestionCardProps> = ({ question, children }) => {
	const { t } = useBntTranslate();
	const askedOnLabel = useAskedOnLabel(question.asked_on);

	return (
		<QuestionCardRoot elevation={0} variant="outlined">
			<QuestionHead>
				<QuestionMeta>
					<AnonymousLine>
						<VisibilityOffOutlined />
						{t(blackBoxTexts.anonymous_employee)}
						<MetaDot />
						{askedOnLabel}
					</AnonymousLine>
					<QuestionStatusChip status={question.status as BlackBoxQuestionStatus} />
				</QuestionMeta>
				<QuestionText>{question.text}</QuestionText>
			</QuestionHead>
			{children ? <QuestionBody>{children}</QuestionBody> : null}
		</QuestionCardRoot>
	);
};
