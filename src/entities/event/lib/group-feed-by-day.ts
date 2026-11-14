import { format, isValid, parseISO } from "date-fns";

import type { TPost } from "@/types/model/post";

export function groupFeedByDay(pages: TPost[][]) {
	const groups: { key: string; date: Date | null; posts: { post: TPost; index: number; isFirstPage: boolean }[] }[] = [];

	pages.forEach((page, pageIndex) => {
		page.forEach((post, index) => {
			const parsed = parseISO(post.date_string_utc || "");
			const date = isValid(parsed) ? parsed : null;
			const key = date ? format(date, "yyyy-MM-dd") : "unknown";
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
