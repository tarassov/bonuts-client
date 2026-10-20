import { describe, expect, it } from "vitest";

import { buildQuestionLink, parseQuestionLinkHash } from "./question-link";

describe("question link", () => {
	it("keeps the tenant and the token in the hash only", () => {
		const link = buildQuestionLink("https://app.bonuts.ru", { tenant: "acme", token: "a-b_c" });
		const url = new URL(link);

		expect(url.pathname).toBe("/black-box/question");
		expect(url.search).toBe("");
		expect(parseQuestionLinkHash(url.hash)).toEqual({ tenant: "acme", token: "a-b_c" });
	});

	it("rejects an incomplete hash", () => {
		expect(parseQuestionLinkHash("#tenant=acme")).toBeNull();
		expect(parseQuestionLinkHash("")).toBeNull();
	});
});
