import type { HrChat, HrChatListItem, HrChatMessage } from "@/services/api/bonuts-api";

export type THrChatMessage = HrChatMessage;
export type THrChatListItem = HrChatListItem;
export type THrChat = HrChat;

// Named values for the unions the backend schema defines; `satisfies` breaks the build if the schema renames one.
export const HrChatMessageStatus = {
	Pending: "pending",
	Ready: "ready",
	Failed: "failed",
} as const satisfies Record<string, THrChatMessage["status"]>;

export const HrChatReplyKind = {
	Answer: "answer",
	TooBroad: "too_broad",
} as const satisfies Record<string, THrChatMessage["reply_kind"]>;

export const HrChatProgressStep = {
	Understanding: "understanding",
	Collecting: "collecting",
	Analyzing: "analyzing",
	Writing: "writing",
} as const satisfies Record<string, NonNullable<THrChatMessage["progress_step"]>>;

/** What the admin sees for one reply; derived on the client from the API status plus the heartbeat age. */
export enum HrChatMessagePhase {
	Queued = "queued",
	Working = "working",
	Stale = "stale",
	Ready = "ready",
	Failed = "failed",
}
