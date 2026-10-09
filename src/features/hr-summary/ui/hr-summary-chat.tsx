import type { FC } from "react";
import { useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";

import { BntTypography } from "@/shared/ui/typography";

import hrSummaryTexts from "../config/hr-summary-texts";
import type { THrSummaryPeriod } from "../model/hr-summary.types";
import { useHrSummaryThread } from "../model/use-hr-summary-thread";

import styles from "./hr-summary-chat.module.scss";
import { HrSummaryComposer } from "./hr-summary-composer";
import { HrSummaryMessage } from "./hr-summary-message";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

export const HrSummaryChat: FC = () => {
	const { t } = useBntTranslate();
	const { thread, now, isLoading, isRequesting, hasActive, request } = useHrSummaryThread();
	const isBusy = isRequesting || hasActive;
	const threadEndRef = useRef<HTMLDivElement | null>(null);
	const messageCount = thread.length;

	// A new request or a finished reply lands at the bottom of the thread, like in a chat.
	useEffect(() => {
		if (messageCount > 0) threadEndRef.current?.scrollIntoView({ block: "end" });
	}, [messageCount]);

	const handleSubmit = (period: THrSummaryPeriod) => {
		request(period).catch(() => undefined);
	};

	return (
		<div className={styles.root}>
			<div className={styles.thread}>
				<BntTypography variant="body2" color="text.secondary">
					{t(hrSummaryTexts.hr_summary_intro, { capitalize: true })}
				</BntTypography>

				{isLoading ? (
					<div className={styles.threadState}>
						<CircularProgress size={24} />
					</div>
				) : null}

				{!isLoading && thread.length === 0 ? (
					<div className={styles.threadState}>
						<BntTypography variant="body2" color="text.secondary">
							{t(hrSummaryTexts.no_summaries_yet, { capitalize: true })}
						</BntTypography>
					</div>
				) : null}

				{thread.map((summary) => (
					<HrSummaryMessage key={summary.id} summary={summary} now={now} isRetryDisabled={isBusy} onRetry={handleSubmit} />
				))}
				<div ref={threadEndRef} />
			</div>

			<HrSummaryComposer isBusy={isBusy} onSubmit={handleSubmit} />
		</div>
	);
};
