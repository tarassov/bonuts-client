import { blackBoxTexts, QUESTION_MIN_LENGTH } from "@/entities/black-box";

/** Nudges for a little more detail once the employee started typing a too short question. */
export const getAskQuestionHint = (draft: string): blackBoxTexts => {
	const length = draft.trim().length;
	const isTooShort = length > 0 && length < QUESTION_MIN_LENGTH;

	return isTooShort ? blackBoxTexts.ask_question_too_short : blackBoxTexts.ask_question_no_trace;
};
