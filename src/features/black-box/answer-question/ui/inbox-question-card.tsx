import type { FC } from "react";
import { useState } from "react";

import { AnswerView, QuestionCard, type TBlackBoxQuestion } from "@/entities/black-box";

import { AnswerEditForm } from "./answer-edit-form";
import { AnsweredQuestionFooter } from "./answered-question-footer";
import { PendingQuestionAnswer } from "./pending-question-answer";

type TInboxQuestionCardProps = {
	question: TBlackBoxQuestion;
	/** Only the responder who gave an answer may rewrite it. */
	currentProfileId?: number;
	isBusy: boolean;
	onAnswer: (id: string, text: string) => Promise<TBlackBoxQuestion | null>;
	onUpdateAnswer: (id: string, text: string) => Promise<TBlackBoxQuestion | null>;
};

export const InboxQuestionCard: FC<TInboxQuestionCardProps> = ({ question, currentProfileId, isBusy, onAnswer, onUpdateAnswer }) => {
	const [isEditing, setIsEditing] = useState(false);
	const { answer } = question;

	if (!answer) {
		return (
			<QuestionCard question={question}>
				<PendingQuestionAnswer question={question} isBusy={isBusy} onAnswer={onAnswer} />
			</QuestionCard>
		);
	}

	if (isEditing) {
		return (
			<QuestionCard question={question}>
				<AnswerEditForm question={question} isBusy={isBusy} onSave={onUpdateAnswer} onCancel={() => setIsEditing(false)} />
			</QuestionCard>
		);
	}

	return (
		<QuestionCard question={question}>
			<AnswerView answer={answer} />
			<AnsweredQuestionFooter isBusy={isBusy} canEdit={answer.answered_by?.id === currentProfileId} onEdit={() => setIsEditing(true)} />
		</QuestionCard>
	);
};
