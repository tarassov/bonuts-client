import { useLayoutEffect, useRef } from "react";

export function useFeedScrollReset(showMine: boolean, searchText: string | undefined, isMobile: boolean) {
	const feedRef = useRef<HTMLDivElement>(null);
	const scrollAreaRef = useRef<HTMLDivElement>(null);
	const previousFilter = useRef({ showMine, searchText });

	useLayoutEffect(() => {
		const previous = previousFilter.current;
		previousFilter.current = { showMine, searchText };
		if (previous.showMine === showMine && previous.searchText === searchText) return;

		scrollAreaRef.current?.scrollTo({ top: 0, behavior: "instant" });
		if (isMobile) feedRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
	}, [showMine, searchText, isMobile]);

	return { feedRef, scrollAreaRef };
}
