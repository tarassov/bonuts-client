import { useCallback, useState } from "react";

import { buildQuestionLink, ChestMode, isQuestionLongEnough, useBlackBoxTenant, usePostBlackBoxQuestionsMutation } from "@/entities/black-box";

export type TSentQuestion = { text: string; link: string };

/**
 * Sends the draft anonymously. The answer comes back only as the secret of the author's link, which is turned
 * into the link right away: it is the only moment the client ever has it.
 */
export const useAskQuestion = () => {
	const tenant = useBlackBoxTenant();
	const [draft, setDraft] = useState("");
	const [sentQuestion, setSentQuestion] = useState<TSentQuestion | null>(null);
	const [isAnimating, setIsAnimating] = useState(false);
	const [createQuestion, { isLoading: isSending }] = usePostBlackBoxQuestionsMutation();

	const send = useCallback(async () => {
		const text = draft.trim();
		if (!tenant || !isQuestionLongEnough(text)) return;

		try {
			const response = await createQuestion({ tenant, body: { text } }).unwrap();
			const link = buildQuestionLink(window.location.origin, { tenant, token: response.data.access_token });

			setDraft("");
			setSentQuestion({ text, link });
			setIsAnimating(true);
		} catch {
			// The rejected action is already reported by rtkErrorHandler; the draft stays for another try.
		}
	}, [createQuestion, draft, tenant]);

	const finishAnimation = useCallback(() => setIsAnimating(false), []);
	const closeLink = useCallback(() => setSentQuestion(null), []);

	return {
		draft,
		setDraft,
		send,
		isSending,
		canSend: isQuestionLongEnough(draft) && !isSending,
		sentQuestion,
		chestMode: isAnimating ? ChestMode.Close : null,
		isLinkShown: Boolean(sentQuestion) && !isAnimating,
		finishAnimation,
		closeLink,
	};
};
