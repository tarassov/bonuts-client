import type { FC } from "react";
import { useState } from "react";
import { CampaignOutlined } from "@mui/icons-material";

import { BntButton } from "@/shared/ui/buttons";

import { blackBoxTexts, isAnswerLongEnough, type TBlackBoxQuestion } from "@/entities/black-box";

import { AnswerComposer } from "./answer-composer";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

type TPendingQuestionAnswerProps = {
	question: TBlackBoxQuestion;
	isBusy: boolean;
	onAnswer: (id: string, text: string) => Promise<TBlackBoxQuestion | null>;
};

export const PendingQuestionAnswer: FC<TPendingQuestionAnswerProps> = ({ question, isBusy, onAnswer }) => {
	const { t } = useBntTranslate();
	const [draft, setDraft] = useState("");

	const actions = (
		<BntButton variant="contained" noTransform startIcon={<CampaignOutlined />} disabled={isBusy || !isAnswerLongEnough(draft)} onClick={() => onAnswer(question.id, draft)}>
			{t(blackBoxTexts.answer_and_publish)}
		</BntButton>
	);

	return <AnswerComposer value={draft} onChange={setDraft} actions={actions} />;
};
