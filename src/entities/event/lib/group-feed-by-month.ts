import { isValid, parseISO, startOfMonth } from "date-fns";

import type { TPost } from "@/types/model/post";

type TFeedPost = { post: TPost; index: number; isFirstPage: boolean };
type TFeedMonth = { key: string; date: Date | null; posts: TFeedPost[] };

export function groupFeedByMonth(pages: TPost[][]): TFeedMonth[] {
	const months = new Map<string, TFeedMonth>();
	const undatedPosts: TFeedPost[] = [];

	pages.forEach((page, pageIndex) => {
		page.forEach((post, index) => {
			const entry = { post, index, isFirstPage: pageIndex === 0 };
			const date = parseISO(post.date_string_utc || "");
			if (!isValid(date)) {
				undatedPosts.push(entry);
				return;
			}

			const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
			let month = months.get(key);
			if (!month) {
				month = { key, date: startOfMonth(date), posts: [] };
				months.set(key, month);
			}
			month.posts.push(entry);
		});
	});

	const groups = [...months.values()];
	if (undatedPosts.length) groups.push({ key: "undated", date: null, posts: undatedPosts });

	return groups;
}

export function formatFeedMonth(date: Date, locale: string): string {
	const label = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" })
		.formatToParts(date)
		.filter(({ type }) => type === "month" || type === "year")
		.map(({ value }) => value)
		.join(" ");

	return label.charAt(0).toLocaleUpperCase(locale) + label.slice(1);
}
