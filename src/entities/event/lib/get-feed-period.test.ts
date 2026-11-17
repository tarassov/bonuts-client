import { describe, expect, it } from "vitest";

import { getFeedPeriod } from "./get-feed-period";

describe("getFeedPeriod", () => {
	const now = new Date(2026, 10, 19, 12);

	it.each([
		[2026, 10, 19, "today"],
		[2026, 10, 18, "yesterday"],
		[2026, 10, 16, "this-week"],
		[2026, 10, 15, "last-week"],
		[2026, 10, 9, "last-week"],
		[2026, 10, 8, "this-month"],
		[2026, 9, 31, "last-month"],
		[2026, 8, 30, "this-year"],
		[2025, 11, 31, "last-year"],
		[2024, 11, 31, "year-2024"],
	])("classifies %s/%s/%s as %s", (year, month, day, key) => {
		expect(getFeedPeriod(new Date(year, month, day), now).key).toBe(key);
	});

	it("hides today's label", () => {
		expect(getFeedPeriod(now, now).label).toBeNull();
	});

	it("prioritizes yesterday across the week and year boundaries", () => {
		expect(getFeedPeriod(new Date(2022, 11, 31), new Date(2023, 0, 1)).key).toBe("yesterday");
		expect(getFeedPeriod(new Date(2026, 10, 15), new Date(2026, 10, 16)).key).toBe("yesterday");
	});

	it("keeps last week together across a year boundary", () => {
		expect(getFeedPeriod(new Date(2025, 11, 28), new Date(2026, 0, 5)).key).toBe("last-month");
		expect(getFeedPeriod(new Date(2025, 11, 31), new Date(2026, 0, 5)).key).toBe("last-week");
	});
});
