import { describe, expect, it } from "vitest";

import { getEventCardRecipient } from "./get-event-card-recipient";
import { DealType } from "@/types/model/deal-type";
import type { TPost } from "@/types/model/post";

const recipient = { id: 2, name: "Alex" };
const post: TPost = {
	id: 1,
	title: "Maria",
	content: "Thank you!",
	public: true,
	profile: { id: 1, name: "Maria" },
	likes: [],
	liked: false,
	likeable: true,
	commentable: true,
	comments: [],
	operation: { id: 1, deal_type: DealType.Share, to_profile: recipient, amount: 5, created_at: "", created_at_utc: "" },
};

describe("getEventCardRecipient", () => {
	it.each([DealType.Share, DealType.Transfer])("uses the people header for public %s events", (deal_type) => {
		expect(getEventCardRecipient({ ...post, operation: { ...post.operation!, deal_type } })).toBe(recipient);
	});

	it.each([DealType.Buy, DealType.RefundRequest, DealType.Refund, DealType.Purchase, undefined])("keeps the operation presentation for %s", (deal_type) => {
		expect(getEventCardRecipient({ ...post, operation: { ...post.operation!, deal_type } })).toBeUndefined();
	});

	it("keeps private events, plain posts and incomplete operations on the existing presentation", () => {
		expect(getEventCardRecipient({ ...post, public: false })).toBeUndefined();
		expect(getEventCardRecipient({ ...post, operation: undefined })).toBeUndefined();
		expect(getEventCardRecipient({ ...post, operation: { ...post.operation!, to_profile: undefined } })).toBeUndefined();
	});

	it("does not hide a distinct operation sender", () => {
		expect(getEventCardRecipient({ ...post, operation: { ...post.operation!, from_profile: { id: 3, name: "Sam" } } })).toBeUndefined();
	});
});
