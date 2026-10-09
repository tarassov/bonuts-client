import { describe, expect, it } from "vitest";

import { getStatusBucketPercent } from "./your-status-helper";

describe("your-status current status", () => {
	describe("getStatusBucketPercent", () => {
		it("maps decimal bucket to direct top percent", () => {
			expect(getStatusBucketPercent("0.50")).toBe(50);
			expect(getStatusBucketPercent("0.75")).toBe(75);
			expect(getStatusBucketPercent("0.90")).toBe(90);
			expect(getStatusBucketPercent("0.00")).toBe(0);
		});

		it("returns null for invalid or out of range values", () => {
			expect(getStatusBucketPercent("1.10")).toBeNull();
			expect(getStatusBucketPercent("-1")).toBeNull();
			expect(getStatusBucketPercent("champion")).toBeNull();
		});
	});
});
