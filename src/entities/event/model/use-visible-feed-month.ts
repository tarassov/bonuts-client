import type { RefObject } from "react";
import { useEffect, useState } from "react";

import type { groupFeedByMonth } from "../lib/group-feed-by-month";

export function useVisibleFeedMonth(
	monthList: HTMLDivElement | null,
	months: ReturnType<typeof groupFeedByMonth>,
	scrollAreaRef: RefObject<HTMLDivElement | null>,
	isMobile: boolean,
	hasPinnedPosts: boolean
) {
	const [visible, setVisible] = useState<string>();

	useEffect(() => {
		const area = scrollAreaRef.current;
		if (!monthList || !area) return;
		if (!months.length) {
			setVisible(undefined);
			return;
		}

		const sections = months.flatMap((month, index) => (month.date ? [{ key: month.key, element: monthList.children[index] }] : []));
		const pinned = hasPinnedPosts ? area.querySelector<HTMLElement>("[data-feed-pinned]") : null;
		let observer: IntersectionObserver | undefined;

		const observe = () => {
			observer?.disconnect();
			const pinnedHeight = pinned && getComputedStyle(pinned).position === "sticky" ? pinned.offsetHeight : 0;
			const visibleSections = new Set<Element>();
			observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting && entry.intersectionRatio > 0) visibleSections.add(entry.target);
						else visibleSections.delete(entry.target);
					}

					setVisible(sections.find(({ element }) => visibleSections.has(element))?.key);
				},
				{ root: isMobile ? null : area, rootMargin: `-${pinnedHeight}px 0px 0px 0px`, threshold: [0, 0.001] }
			);
			for (const { element } of sections) observer.observe(element);
		};

		observe();
		const resizeObserver = pinned ? new ResizeObserver(observe) : undefined;
		if (pinned) resizeObserver?.observe(pinned);

		return () => {
			resizeObserver?.disconnect();
			observer?.disconnect();
		};
	}, [monthList, months, scrollAreaRef, isMobile, hasPinnedPosts]);

	return visible;
}
