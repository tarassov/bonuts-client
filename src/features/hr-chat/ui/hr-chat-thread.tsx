import type { FC } from "react";
import { useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";

import { BntTypography } from "@/shared/ui/typography";

import hrChatTexts from "../config/hr-chat-texts";
import type { THrChatMessage } from "../model/hr-chat.types";

import { HrChatMessage } from "./hr-chat-message";
import styles from "./hr-chat-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

/** A reader who scrolled up to re-read an older reply is not pulled down when a new reply lands. */
const NEAR_BOTTOM_PX = 160;

interface IHrChatThreadProps {
	messages: THrChatMessage[];
	now: Date;
	isLoading: boolean;
	isRetryDisabled: boolean;
	onRetry: (prompt: string) => void;
}

export const HrChatThread: FC<IHrChatThreadProps> = ({ messages, now, isLoading, isRetryDisabled, onRetry }) => {
	const { t } = useBntTranslate();
	const containerRef = useRef<HTMLDivElement | null>(null);
	const lastMessage = messages.at(-1);
	const lastMessageId = lastMessage?.id;
	const lastMessageStatus = lastMessage?.status;

	// A new question always shows at the bottom; a finished reply only scrolls when the reader is already there.
	useEffect(() => {
		const container = containerRef.current;
		if (!container || !lastMessageId) return;

		container.scrollTo({ top: container.scrollHeight });
	}, [lastMessageId]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: the status is the trigger, not a value the effect reads
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
		if (distanceToBottom < NEAR_BOTTOM_PX) container.scrollTo({ top: container.scrollHeight });
	}, [lastMessageStatus]);

	return (
		<div ref={containerRef} className={styles.thread}>
			{isLoading ? (
				<div className={styles.threadState}>
					<CircularProgress size={24} />
				</div>
			) : null}

			{!isLoading && messages.length === 0 ? (
				<div className={styles.threadState}>
					<BntTypography variant="body2" color="text.secondary">
						{t(hrChatTexts.chat_intro, { capitalize: true })}
					</BntTypography>
					<BntTypography variant="caption" color="text.secondary">
						{t(hrChatTexts.example_questions, { capitalize: true })}
					</BntTypography>
				</div>
			) : null}

			{messages.map((message) => (
				<HrChatMessage key={message.id} message={message} now={now} isRetryDisabled={isRetryDisabled} onRetry={onRetry} />
			))}
		</div>
	);
};
