import type { FC } from "react";

import type { BlackBoxQuestionStatus } from "../model/black-box.types";
import { QUESTION_STATUS_META } from "../model/question-status-meta";

import { StatusChip } from "./question-status-chip.styles";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

type TQuestionStatusChipProps = {
	status: BlackBoxQuestionStatus;
};

export const QuestionStatusChip: FC<TQuestionStatusChipProps> = ({ status }) => {
	const { t } = useBntTranslate();
	const meta = QUESTION_STATUS_META[status];

	return <StatusChip size="small" tone={meta.tone} label={t(meta.label)} />;
};
