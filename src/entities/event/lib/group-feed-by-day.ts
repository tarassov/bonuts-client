import { isValid, parseISO } from "date-fns";

import { getFeedPeriod } from "./get-feed-period";
import type { TPost } from "@/types/model/post";

export function groupFeedByDay(pages: TPost[][], now = new Date()) {
	const groups: { key: string; date: Date | null; posts: { post: TPost; index: number; isFirstPage: boolean }[] }[] = [];

	pages.forEach((page, pageIndex) => {
		page.forEach((post, index) => {
			const parsed = parseISO(post.date_string_utc || "");
			const date = isValid(parsed) ? parsed : null;
			const key = date ? getFeedPeriod(date, now).key : "unknown";
			let group = groups[groups.length - 1];
			if (!group || group.key !== key) {
				group = { key, date, posts: [] };
				groups.push(group);
			}
			group.posts.push({ post, index, isFirstPage: pageIndex === 0 });
		});
	});

	return groups;
}
