import { useCallback, useState } from "react";

import { BlackBoxQuestionStatus, ChestMode, type TBlackBoxQuestion } from "@/entities/black-box";

/** The opening box plays once an answer made a question visible to the whole team. */
export const usePublishAnimation = () => {
	const [publishedText, setPublishedText] = useState<string | null>(null);

	const playFor = useCallback((question: TBlackBoxQuestion | null) => {
		if (question?.status === BlackBoxQuestionStatus.Published) setPublishedText(question.text);
	}, []);

	const finish = useCallback(() => setPublishedText(null), []);

	return { publishedText, chestMode: publishedText ? ChestMode.Open : null, playFor, finish };
};
