import { describe, expect, it } from "vitest";

import { getNextBucketTargetPercent } from "./your-status-helper";

describe("your-status next status", () => {
	describe("getNextBucketTargetPercent", () => {
		it("maps next bucket percentile to target top percent", () => {
			expect(getNextBucketTargetPercent("0.25")).toBe(75);
			expect(getNextBucketTargetPercent("0.50")).toBe(50);
			expect(getNextBucketTargetPercent("0.00")).toBe(100);
		});

		it("returns null for invalid values", () => {
			expect(getNextBucketTargetPercent("1.10")).toBeNull();
			expect(getNextBucketTargetPercent("abc")).toBeNull();
			expect(getNextBucketTargetPercent(null)).toBeNull();
		});
	});
});
