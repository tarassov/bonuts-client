import type { FC } from "react";
import { useState } from "react";

import { BntButton } from "@/shared/ui/buttons";

import { blackBoxTexts, isAnswerLongEnough, type TBlackBoxQuestion } from "@/entities/black-box";

import { AnswerComposer } from "./answer-composer";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

type TAnswerEditFormProps = {
	question: TBlackBoxQuestion;
	isBusy: boolean;
	onSave: (id: string, text: string) => Promise<TBlackBoxQuestion | null>;
	onCancel: () => void;
};

export const AnswerEditForm: FC<TAnswerEditFormProps> = ({ question, isBusy, onSave, onCancel }) => {
	const { t } = useBntTranslate();
	const [draft, setDraft] = useState(question.answer?.text ?? "");

	const handleSave = async () => {
		const saved = await onSave(question.id, draft);
		if (saved) onCancel();
	};

	const actions = (
		<>
			<BntButton variant="text" noTransform disabled={isBusy} onClick={onCancel}>
				{t(blackBoxTexts.cancel)}
			</BntButton>
			<BntButton variant="contained" noTransform disabled={isBusy || !isAnswerLongEnough(draft)} onClick={handleSave}>
				{t(blackBoxTexts.save_answer)}
			</BntButton>
		</>
	);

	return <AnswerComposer value={draft} onChange={setDraft} actions={actions} />;
};
