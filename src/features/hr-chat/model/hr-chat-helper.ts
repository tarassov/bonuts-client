import { differenceInMinutes, parseISO } from "date-fns";

import { HrChatMessagePhase, HrChatMessageStatus, type THrChat, type THrChatMessage } from "./hr-chat.types";

/** Mirrors HrChatMessage::STALE_AFTER on the backend; one extra minute covers the cron delay. */
export const STALE_AFTER_MINUTES = 5;

export const getElapsedMinutes = (message: THrChatMessage, now: Date): number => Math.max(0, differenceInMinutes(now, parseISO(message.created_at)));

const getHeartbeatAgeMinutes = (message: THrChatMessage, now: Date): number => differenceInMinutes(now, parseISO(message.heartbeat_at ?? message.created_at));

export const getMessagePhase = (message: THrChatMessage, now: Date): HrChatMessagePhase => {
	if (message.status === HrChatMessageStatus.Ready) return HrChatMessagePhase.Ready;
	if (message.status === HrChatMessageStatus.Failed) return HrChatMessagePhase.Failed;
	if (getHeartbeatAgeMinutes(message, now) > STALE_AFTER_MINUTES) return HrChatMessagePhase.Stale;

	return message.started_at ? HrChatMessagePhase.Working : HrChatMessagePhase.Queued;
};

export const hasPendingMessage = (chat?: Pick<THrChat, "messages"> | null): boolean => Boolean(chat?.messages.some((message) => message.status === HrChatMessageStatus.Pending));

/** The API returns messages in creation order already; sorting keeps the thread stable after cache merges. */
export const sortMessages = (messages: THrChatMessage[]): THrChatMessage[] => [...messages].sort((left, right) => left.id - right.id);
