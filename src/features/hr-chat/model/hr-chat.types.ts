export enum HrChatMessageStatus {
	Pending = "pending",
	Ready = "ready",
	Failed = "failed",
}

export enum HrChatReplyKind {
	Answer = "answer",
	TooBroad = "too_broad",
}

export enum HrChatProgressStep {
	Understanding = "understanding",
	Collecting = "collecting",
	Analyzing = "analyzing",
	Writing = "writing",
}

/** What the admin sees for one reply; derived from the API status plus the heartbeat age. */
export enum HrChatMessagePhase {
	Queued = "queued",
	Working = "working",
	Stale = "stale",
	Ready = "ready",
	Failed = "failed",
}

export type THrChatMetrics = {
	transfers?: number;
	transfer_amount?: number;
	transfers_with_comments?: number;
	senders?: number;
	receivers?: number;
	participants?: number;
	feed_posts?: number;
	comments?: number;
	admin_accruals?: number;
	people?: number;
};

/** Tokens the AI gateway reported for all calls behind one reply. */
export type THrChatUsage = {
	prompt_tokens?: number;
	completion_tokens?: number;
	total_tokens?: number;
	calls?: number;
};

export type THrChatMessage = {
	id: number;
	prompt: string;
	reply: string | null;
	reply_kind: HrChatReplyKind;
	status: HrChatMessageStatus;
	period_from: string | null;
	period_to: string | null;
	resolved_query: Record<string, unknown>;
	metrics: THrChatMetrics;
	usage: THrChatUsage;
	progress_step: HrChatProgressStep | null;
	progress_current: number | null;
	progress_total: number | null;
	started_at: string | null;
	heartbeat_at: string | null;
	error_message: string | null;
	created_at: string;
};

export type THrChatListItem = {
	id: number;
	title: string;
	last_message_at: string;
	has_pending: boolean;
};

export type THrChat = {
	id: number;
	title: string;
	last_message_at: string;
	messages: THrChatMessage[];
};
