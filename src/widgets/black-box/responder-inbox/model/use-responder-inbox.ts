import { useState } from "react";

import { BlackBoxQuestionStatus, type TBlackBoxInboxCounts, type TBlackBoxQuestion, useBlackBoxTenant, useGetBlackBoxInboxQuery } from "@/entities/black-box";

const EMPTY_COUNTS: TBlackBoxInboxCounts = { pending: 0, published: 0 };

/** The questions of the selected status and the counts of every status for the tabs and the hero. */
export const useResponderInbox = () => {
	const tenant = useBlackBoxTenant();
	const [status, setStatus] = useState<BlackBoxQuestionStatus>(BlackBoxQuestionStatus.Pending);
	const { data, isLoading } = useGetBlackBoxInboxQuery({ tenant, status }, { skip: !tenant, refetchOnFocus: true });
	const questions: Array<TBlackBoxQuestion> = data?.data ?? [];
	const counts = data?.meta.counts ?? EMPTY_COUNTS;

	return { status, setStatus, questions, counts, isLoading };
};
