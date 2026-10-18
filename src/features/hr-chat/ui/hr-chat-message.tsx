import type { FC } from "react";
import { CircularProgress } from "@mui/material";

import { useFormattedDate } from "@/shared/lib/date";
import { BntTransparentButton } from "@/shared/ui/buttons";
import { BntChip } from "@/shared/ui/chip";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import hrChatTexts from "../config/hr-chat-texts";
import { HrChatMessagePhase, HrChatProgressStep, HrChatReplyKind, type THrChatMessage } from "../model/hr-chat.types";
import { getElapsedMinutes, getMessagePhase } from "../model/hr-chat-helper";

import { HrChatMarkdown } from "./hr-chat-markdown";
import { ReplyBubble, RequestBubble } from "./hr-chat-message.styles";
import styles from "./hr-chat-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

interface IHrChatMessageProps {
	message: THrChatMessage;
	now: Date;
	isRetryDisabled: boolean;
	onRetry: (prompt: string) => void;
}

export const HrChatMessage: FC<IHrChatMessageProps> = ({ message, now, isRetryDisabled, onRetry }) => {
	const { getFormattedDate } = useFormattedDate();
	const phase = getMessagePhase(message, now);
	const isHint = message.reply_kind === HrChatReplyKind.TooBroad;
	const retry = () => onRetry(message.prompt);

	return (
		<div className={styles.message}>
			<RequestBubble>
				<BntTypography variant="body2">{message.prompt}</BntTypography>
				<BntTypography variant="caption" color="text.secondary" sx={{ display: "block" }}>
					{getFormattedDate(message.created_at, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
				</BntTypography>
			</RequestBubble>

			<ReplyBubble hint={isHint}>
				{phase === HrChatMessagePhase.Queued || phase === HrChatMessagePhase.Working ? <WorkingReply message={message} phase={phase} now={now} /> : null}
				{phase === HrChatMessagePhase.Stale ? (
					<BntTypography variant="body2" color="warning.main">
						<Translated text={hrChatTexts.reply_stuck} />
					</BntTypography>
				) : null}
				{phase === HrChatMessagePhase.Failed ? <FailedReply errorMessage={message.error_message} isRetryDisabled={isRetryDisabled} onRetry={retry} /> : null}
				{phase === HrChatMessagePhase.Ready ? <ReadyReply message={message} /> : null}
			</ReplyBubble>
		</div>
	);
};

const Translated: FC<{ text: string }> = ({ text }) => {
	const { t } = useBntTranslate();

	return <>{t(text, { capitalize: true })}</>;
};

const WorkingReply: FC<{ message: THrChatMessage; phase: HrChatMessagePhase; now: Date }> = ({ message, phase, now }) => {
	const { t } = useBntTranslate();
	const elapsedMinutes = getElapsedMinutes(message, now);
	const label = phase === HrChatMessagePhase.Queued ? t(hrChatTexts.step_queued, { capitalize: true }) : getStepLabel(message, t);

	return (
		<BntStack direction="row" alignItems="center" gap={1}>
			<CircularProgress size={16} />
			<BntTypography variant="body2" color="text.secondary">
				{label}
				{elapsedMinutes > 0 ? ` · ${t(hrChatTexts.working_elapsed, { minutes: elapsedMinutes })}` : ""}
			</BntTypography>
		</BntStack>
	);
};

type TTranslate = ReturnType<typeof useBntTranslate>["t"];

const getStepLabel = (message: THrChatMessage, t: TTranslate): string => {
	switch (message.progress_step) {
		case HrChatProgressStep.Understanding:
			return t(hrChatTexts.step_understanding, { capitalize: true });
		case HrChatProgressStep.Collecting:
			return t(hrChatTexts.step_collecting, { capitalize: true });
		case HrChatProgressStep.Analyzing:
			return message.progress_current && message.progress_total
				? t(hrChatTexts.step_analyzing_progress, { capitalize: true, current: message.progress_current, total: message.progress_total })
				: t(hrChatTexts.step_analyzing, { capitalize: true });
		case HrChatProgressStep.Writing:
			return t(hrChatTexts.step_writing, { capitalize: true });
		default:
			return t(hrChatTexts.step_understanding, { capitalize: true });
	}
};

const FailedReply: FC<{ errorMessage: string | null; isRetryDisabled: boolean; onRetry: () => void }> = ({ errorMessage, isRetryDisabled, onRetry }) => {
	const { t } = useBntTranslate();

	return (
		<BntStack direction="column" gap={0.5} alignItems="flex-start">
			<BntTypography variant="body2" color="error.main">
				{t(hrChatTexts.reply_failed, { capitalize: true })}
			</BntTypography>
			{errorMessage ? (
				<BntTypography variant="caption" color="text.secondary">
					{errorMessage}
				</BntTypography>
			) : null}
			<BntTransparentButton size="small" disabled={isRetryDisabled} onClick={onRetry}>
				{t(hrChatTexts.ask_again, { capitalize: true })}
			</BntTransparentButton>
		</BntStack>
	);
};

const ReadyReply: FC<{ message: THrChatMessage }> = ({ message }) => {
	const { t } = useBntTranslate();
	const { getFormattedDate } = useFormattedDate();
	const chips: string[] = [];
	if (message.period_from && message.period_to) {
		chips.push(t(hrChatTexts.period_chip, { from: getFormattedDate(message.period_from), to: getFormattedDate(message.period_to) }));
	}
	if (typeof message.metrics.transfers === "number") chips.push(t(hrChatTexts.transfers_chip, { count: message.metrics.transfers }));
	if (message.metrics.feed_posts) chips.push(t(hrChatTexts.posts_chip, { count: message.metrics.feed_posts }));
	if (message.metrics.comments) chips.push(t(hrChatTexts.comments_chip, { count: message.metrics.comments }));
	if (message.usage.total_tokens) chips.push(t(hrChatTexts.tokens_chip, { tokens: message.usage.total_tokens.toLocaleString() }));

	return (
		<BntStack direction="column" gap={1} alignItems="flex-start">
			<div className={styles.markdown}>
				<HrChatMarkdown text={message.reply ?? ""} />
			</div>
			{chips.length > 0 ? (
				<BntStack direction="row" gap={0.5} flexWrap="wrap">
					{chips.map((chip) => (
						<BntChip key={chip} label={chip} size="small" variant="outlined" />
					))}
				</BntStack>
			) : null}
		</BntStack>
	);
};
