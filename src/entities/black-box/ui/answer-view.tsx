import type { FC } from "react";

import type { TBlackBoxAnswer } from "../model/black-box.types";

import { AnswerText } from "./answer-view.styles";
import { AnswererRow } from "./answerer-row";

type TAnswerViewProps = {
	answer: TBlackBoxAnswer;
};

export const AnswerView: FC<TAnswerViewProps> = ({ answer }) => (
	<>
		<AnswererRow answerer={answer.answered_by} answeredAt={answer.answered_at} />
		<AnswerText>{answer.text}</AnswerText>
	</>
);
