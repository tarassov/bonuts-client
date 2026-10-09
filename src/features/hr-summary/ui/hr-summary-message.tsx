import type { FC } from "react";
import { useState } from "react";
import { CircularProgress, Collapse } from "@mui/material";

import { useFormattedDate } from "@/shared/lib/date";
import { BntTransparentButton } from "@/shared/ui/buttons";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import hrSummaryTexts from "../config/hr-summary-texts";
import { HrSummaryPhase, type THrSummary, type THrSummaryPeriod } from "../model/hr-summary.types";
import { getElapsedMinutes, getSummaryPeriod, getSummaryPhase } from "../model/hr-summary-helper";

import styles from "./hr-summary-chat.module.scss";
import { ReplyBubble, RequestBubble } from "./hr-summary-message.styles";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

interface IHrSummaryMessageProps {
	summary: THrSummary;
	now: Date;
	isRetryDisabled: boolean;
	onRetry: (period: THrSummaryPeriod) => void;
}

export const HrSummaryMessage: FC<IHrSummaryMessageProps> = ({ summary, now, isRetryDisabled, onRetry }) => {
	const { t } = useBntTranslate();
	const { getFormattedDate } = useFormattedDate();
	const [isAnnualOpen, setIsAnnualOpen] = useState(false);

	const phase = getSummaryPhase(summary, now);
	const toggleAnnual = () => setIsAnnualOpen((isOpen) => !isOpen);
	const retry = () => onRetry(getSummaryPeriod(summary));

	const requestLabel = t(hrSummaryTexts.summary_request_for_period, {
		capitalize: true,
		from: getFormattedDate(summary.period_from),
		to: getFormattedDate(summary.period_to),
	});

	return (
		<div className={styles.message}>
			<RequestBubble>
				<BntTypography variant="body2">{requestLabel}</BntTypography>
				<BntTypography variant="caption" color="text.secondary">
					{getFormattedDate(summary.created_at, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
				</BntTypography>
			</RequestBubble>

			<ReplyBubble>
				{phase === HrSummaryPhase.Queued || phase === HrSummaryPhase.Generating ? <InProgressReply phase={phase} elapsedMinutes={getElapsedMinutes(summary, now)} /> : null}
				{phase === HrSummaryPhase.Stale ? <StaleReply isRetryDisabled={isRetryDisabled} onRetry={retry} /> : null}
				{phase === HrSummaryPhase.Failed ? <FailedReply errorMessage={summary.error_message} isRetryDisabled={isRetryDisabled} onRetry={retry} /> : null}
				{phase === HrSummaryPhase.Ready ? <ReadyReply summary={summary} isAnnualOpen={isAnnualOpen} onToggleAnnual={toggleAnnual} /> : null}
			</ReplyBubble>
		</div>
	);
};

const InProgressReply: FC<{ phase: HrSummaryPhase; elapsedMinutes: number }> = ({ phase, elapsedMinutes }) => {
	const { t } = useBntTranslate();
	const label =
		phase === HrSummaryPhase.Queued
			? t(hrSummaryTexts.queued_for_generation, { capitalize: true })
			: elapsedMinutes > 0
				? t(hrSummaryTexts.preparing_summary_elapsed, { capitalize: true, minutes: elapsedMinutes })
				: t(hrSummaryTexts.preparing_summary, { capitalize: true });

	return (
		<BntStack direction="row" alignItems="center" gap={1}>
			<CircularProgress size={16} />
			<BntTypography variant="body2" color="text.secondary">
				{label}
			</BntTypography>
		</BntStack>
	);
};

const StaleReply: FC<{ isRetryDisabled: boolean; onRetry: () => void }> = ({ isRetryDisabled, onRetry }) => {
	const { t } = useBntTranslate();

	return (
		<BntStack direction="column" gap={0.5} alignItems="flex-start">
			<BntTypography variant="body2" color="warning.main">
				{t(hrSummaryTexts.summary_stuck, { capitalize: true })}
			</BntTypography>
			<BntTransparentButton size="small" disabled={isRetryDisabled} onClick={onRetry}>
				{t(hrSummaryTexts.request_again, { capitalize: true })}
			</BntTransparentButton>
		</BntStack>
	);
};

const FailedReply: FC<{ errorMessage: string | null; isRetryDisabled: boolean; onRetry: () => void }> = ({ errorMessage, isRetryDisabled, onRetry }) => {
	const { t } = useBntTranslate();

	return (
		<BntStack direction="column" gap={0.5} alignItems="flex-start">
			<BntTypography variant="body2" color="error.main">
				{t(hrSummaryTexts.summary_failed, { capitalize: true })}
			</BntTypography>
			{errorMessage ? (
				<BntTypography variant="caption" color="text.secondary">
					{errorMessage}
				</BntTypography>
			) : null}
			<BntTransparentButton size="small" disabled={isRetryDisabled} onClick={onRetry}>
				{t(hrSummaryTexts.request_again, { capitalize: true })}
			</BntTransparentButton>
		</BntStack>
	);
};

const ReadyReply: FC<{ summary: THrSummary; isAnnualOpen: boolean; onToggleAnnual: () => void }> = ({ summary, isAnnualOpen, onToggleAnnual }) => {
	const { t } = useBntTranslate();

	return (
		<BntStack direction="column" gap={1} alignItems="flex-start">
			<BntTypography variant="body2">{summary.period_summary}</BntTypography>
			<BntTransparentButton size="small" onClick={onToggleAnnual}>
				{t(isAnnualOpen ? hrSummaryTexts.hide_annual_overview : hrSummaryTexts.show_annual_overview, { capitalize: true })}
			</BntTransparentButton>
			<Collapse in={isAnnualOpen} unmountOnExit>
				<BntTypography variant="body2" color="text.secondary">
					{summary.annual_summary}
				</BntTypography>
			</Collapse>
		</BntStack>
	);
};
