import { describe, expect, it } from "vitest";

import { formatFeedMonth, groupFeedByMonth } from "./group-feed-by-month";
import type { TPost } from "@/types/model/post";

const post = (id: number, date: string) => ({ id, date_string_utc: date }) as TPost;

describe("groupFeedByMonth", () => {
	it("keeps one month across page boundaries and separates the previous year", () => {
		const groups = groupFeedByMonth([
			[post(1, "2026-01-29T12:00:00"), post(2, "2026-01-15T11:00:00")],
			[post(3, "2026-01-04T12:00:00"), post(4, "2025-12-27T12:00:00")],
		]);

		expect(groups.map(({ key }) => key)).toEqual(["2026-1", "2025-12"]);
		expect(groups.map(({ posts }) => posts.map(({ post }) => post.id))).toEqual([[1, 2, 3], [4]]);
		expect(groups[0].posts[2].index).toBe(0);
	});

	it("groups dates in the viewer's calendar and retains undated posts", () => {
		const groups = groupFeedByMonth([[post(1, "2026-10-01T00:00:00"), post(2, "invalid"), post(3, "2026-10-01T12:00:00")]]);

		expect(groups).toHaveLength(2);
		expect(groups[0].date).toEqual(new Date(2026, 9, 1));
		expect(groups[0].posts.map(({ post }) => post.id)).toEqual([1, 3]);
		expect(groups[1].date).toBeNull();
		expect(groups[1].posts[0].post.id).toBe(2);
		expect(groupFeedByMonth([])).toEqual([]);
	});
});

describe("formatFeedMonth", () => {
	it.each([
		["ru", "Май 2026"],
		["en", "May 2026"],
		["kk", "2026 мамыр"],
	])("formats a month in %s", (locale, expected) => {
		expect(formatFeedMonth(new Date(2026, 4, 1), locale)).toBe(expected);
	});
});
