import { describe, expect, it } from "vitest";

import { HrChatMessagePhase, HrChatMessageStatus, HrChatProgressStep, HrChatReplyKind, type THrChatMessage } from "./hr-chat.types";
import { getMessagePhase, hasPendingMessage, sortMessages } from "./hr-chat-helper";

const now = new Date("2026-10-17T12:00:00Z");

const message = (overrides: Partial<THrChatMessage> = {}): THrChatMessage => ({
	id: 1,
	prompt: "Как прошёл сентябрь?",
	reply: null,
	reply_kind: HrChatReplyKind.Answer,
	status: HrChatMessageStatus.Pending,
	period_from: null,
	period_to: null,
	resolved_query: {},
	metrics: {},
	usage: {},
	progress_step: null,
	progress_current: null,
	progress_total: null,
	started_at: null,
	heartbeat_at: null,
	error_message: null,
	created_at: "2026-10-17T11:58:00Z",
	...overrides,
});

describe("getMessagePhase", () => {
	it("is queued until the job claims the message", () => {
		expect(getMessagePhase(message(), now)).toBe(HrChatMessagePhase.Queued);
	});

	it("is working while the heartbeat is fresh, whatever the step", () => {
		const working = message({ started_at: "2026-10-17T11:58:30Z", heartbeat_at: "2026-10-17T11:59:00Z", progress_step: HrChatProgressStep.Analyzing });

		expect(getMessagePhase(working, now)).toBe(HrChatMessagePhase.Working);
	});

	it("is stale once the heartbeat is older than the backend threshold", () => {
		const silent = message({ started_at: "2026-10-17T11:00:00Z", heartbeat_at: "2026-10-17T11:54:00Z" });
		const neverStarted = message({ created_at: "2026-10-17T11:50:00Z" });

		expect(getMessagePhase(silent, now)).toBe(HrChatMessagePhase.Stale);
		expect(getMessagePhase(neverStarted, now)).toBe(HrChatMessagePhase.Stale);
	});

	it("follows the final status regardless of timestamps", () => {
		expect(getMessagePhase(message({ status: HrChatMessageStatus.Ready, reply: "Ответ", created_at: "2026-10-17T10:00:00Z" }), now)).toBe(HrChatMessagePhase.Ready);
		expect(getMessagePhase(message({ status: HrChatMessageStatus.Failed }), now)).toBe(HrChatMessagePhase.Failed);
	});
});

describe("hasPendingMessage", () => {
	it("is true only while some message of the chat is pending", () => {
		expect(hasPendingMessage({ messages: [message({ status: HrChatMessageStatus.Ready }), message({ id: 2 })] })).toBe(true);
		expect(hasPendingMessage({ messages: [message({ status: HrChatMessageStatus.Ready })] })).toBe(false);
		expect(hasPendingMessage(null)).toBe(false);
	});
});

describe("sortMessages", () => {
	it("orders the thread by id without mutating the input", () => {
		const input = [message({ id: 3 }), message({ id: 1 }), message({ id: 2 })];

		expect(sortMessages(input).map((item) => item.id)).toEqual([1, 2, 3]);
		expect(input.map((item) => item.id)).toEqual([3, 1, 2]);
	});
});
