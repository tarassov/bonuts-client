import type { FC } from "react";
import { LockOutlined, ShieldOutlined } from "@mui/icons-material";

import { BntButton } from "@/shared/ui/buttons";

import { blackBoxTexts, ChestAnimation, HeroPanel, TEXT_MAX_LENGTH } from "@/entities/black-box";

import { getAskQuestionHint } from "../model/ask-question-hint";
import { useAskQuestion } from "../model/use-ask-question";

import { AskFooter, AskHeader, AskTextField, AskTitle, PanelNote } from "./ask-question-form.styles";
import { QuestionLinkDialog } from "./question-link-dialog";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

const QUESTION_MIN_ROWS = 4;

/** The compact question form that lives on the dark hero of the black box page. */
export const AskQuestionForm: FC = () => {
	const { t } = useBntTranslate();
	const { draft, setDraft, send, canSend, sentQuestion, chestMode, isLinkShown, finishAnimation, closeLink } = useAskQuestion();

	return (
		<HeroPanel>
			<AskHeader>
				<AskTitle>{t(blackBoxTexts.ask_question)}</AskTitle>
				<PanelNote>
					<LockOutlined />
					{t(blackBoxTexts.ask_question_hint)}
				</PanelNote>
			</AskHeader>
			<AskTextField
				multiline
				fullWidth
				minRows={QUESTION_MIN_ROWS}
				value={draft}
				onChange={(event) => setDraft(event.target.value)}
				placeholder={t(blackBoxTexts.ask_question_placeholder)}
				slotProps={{ htmlInput: { maxLength: TEXT_MAX_LENGTH, "aria-label": t(blackBoxTexts.ask_question) } }}
			/>
			<AskFooter>
				<PanelNote>
					<ShieldOutlined />
					{t(getAskQuestionHint(draft))}
				</PanelNote>
				<BntButton variant="contained" noTransform disabled={!canSend} onClick={send}>
					{t(blackBoxTexts.send_anonymously)}
				</BntButton>
			</AskFooter>
			{chestMode && sentQuestion ? <ChestAnimation mode={chestMode} text={sentQuestion.text} onFinish={finishAnimation} /> : null}
			{isLinkShown && sentQuestion ? <QuestionLinkDialog link={sentQuestion.link} onClose={closeLink} /> : null}
		</HeroPanel>
	);
};
