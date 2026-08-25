import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { CircularProgress } from "@mui/material";

import { BntStack } from "@/shared/ui/stack";

interface IInfiniteScrollTriggerProps {
	isFetching: boolean;
	loadedPageCount: number;
	onLoadMore: VoidFunction;
}

export function InfiniteScrollTrigger({ isFetching, loadedPageCount, onLoadMore }: IInfiniteScrollTriggerProps) {
	const { inView, ref } = useInView();
	const loadStateRef = useRef({ isFetching, onLoadMore });
	loadStateRef.current = { isFetching, onLoadMore };

	useEffect(() => {
		const { isFetching: isPageFetching, onLoadMore: loadMore } = loadStateRef.current;
		if (inView && loadedPageCount > 0 && !isPageFetching) loadMore();
	}, [inView, loadedPageCount]);

	return (
		<div data-testid="infinite-scroll-trigger" ref={ref}>
			<BntStack alignItems="center" justifyContent="center" sx={{ minHeight: 48, py: 2 }}>
				<CircularProgress size={24} sx={{ visibility: isFetching ? "visible" : "hidden" }} />
			</BntStack>
		</div>
	);
}
