import { describe, expect, it } from "vitest";

import { groupFeedByDay } from "./group-feed-by-day";
import type { TPost } from "@/types/model/post";

const post = (id: number, date: string) => ({ id, date_string_utc: date }) as TPost;

describe("groupFeedByDay", () => {
	it("merges a period across page boundaries without changing event order", () => {
		const groups = groupFeedByDay([[post(1, "2026-11-16T12:00:00")], [post(2, "2026-11-16T11:00:00"), post(3, "2026-11-10T12:00:00Z")]], new Date(2026, 10, 17));
		expect(groups.map((group) => group.posts.map(({ post }) => post.id))).toEqual([[1, 2], [3]]);
		expect(groups[0].posts[1].isFirstPage).toBe(false);
	});
	it("groups by local calendar day and tolerates missing dates", () => {
		const groups = groupFeedByDay([[post(1, "2026-11-14T00:30:00+14:00"), post(2, "2026-11-13T10:30:00Z"), post(3, "invalid")]]);
		expect(groups).toHaveLength(2);
		expect(groups[0].posts).toHaveLength(2);
		expect(groups[1].date).toBeNull();
		expect(groupFeedByDay([])).toEqual([]);
	});
});
