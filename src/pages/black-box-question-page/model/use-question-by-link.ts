import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { parseQuestionLinkHash, type TBlackBoxQuestion, usePostBlackBoxQuestionsLookupMutation } from "@/entities/black-box";

/** Opens the question from the secret in the URL hash; a lookup is a POST so the token never lands in a logged path. */
export const useQuestionByLink = () => {
	const { hash } = useLocation();
	const [lookup, { isLoading, isError }] = usePostBlackBoxQuestionsLookupMutation();
	const [question, setQuestion] = useState<TBlackBoxQuestion | null>(null);
	const secret = useMemo(() => parseQuestionLinkHash(hash), [hash]);

	useEffect(() => {
		if (!secret) return;

		lookup({ tenant: secret.tenant, body: { token: secret.token } })
			.unwrap()
			.then((response) => setQuestion(response.data))
			.catch(() => setQuestion(null));
	}, [lookup, secret]);

	return { question, isLoading, isNotFound: !secret || isError };
};
