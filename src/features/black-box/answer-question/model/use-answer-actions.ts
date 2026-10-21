import { useCallback } from "react";

import { useNotification } from "@/shared/ui/notification";

import { blackBoxTexts, type TBlackBoxQuestion, useBlackBoxTenant, usePostBlackBoxInboxByIdAnswerMutation, usePutBlackBoxInboxByIdAnswerMutation } from "@/entities/black-box";

/** Resolves to the updated question, or null when the request failed (rtkErrorHandler already reported it). */
const runSafely = async (request: () => Promise<{ data: TBlackBoxQuestion }>): Promise<TBlackBoxQuestion | null> => {
	try {
		const response = await request();

		return response.data;
	} catch {
		return null;
	}
};

export const useAnswerActions = () => {
	const tenant = useBlackBoxTenant();
	const { showNotification } = useNotification();
	const [answerQuestion, { isLoading: isAnswering }] = usePostBlackBoxInboxByIdAnswerMutation();
	const [updateAnswerRequest, { isLoading: isUpdating }] = usePutBlackBoxInboxByIdAnswerMutation();

	/** Answering publishes the question with the answer for the whole team. */
	const answer = useCallback(
		async (id: string, text: string): Promise<TBlackBoxQuestion | null> => {
			const question = await runSafely(() => answerQuestion({ tenant, id, body: { text: text.trim() } }).unwrap());
			if (question) showNotification(blackBoxTexts.published_toast);

			return question;
		},
		[answerQuestion, showNotification, tenant]
	);

	const updateAnswer = useCallback(
		async (id: string, text: string): Promise<TBlackBoxQuestion | null> => {
			const question = await runSafely(() => updateAnswerRequest({ tenant, id, body: { text: text.trim() } }).unwrap());
			if (question) showNotification(blackBoxTexts.answer_saved_toast);

			return question;
		},
		[showNotification, tenant, updateAnswerRequest]
	);

	return { answer, updateAnswer, isBusy: isAnswering || isUpdating };
};
