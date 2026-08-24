import { InView } from "react-intersection-observer";
import { CircularProgress } from "@mui/material";

import { BntStack } from "@/shared/ui/stack";

interface IInfiniteScrollTriggerProps {
	isFetching: boolean;
	onLoadMore: VoidFunction;
}

export function InfiniteScrollTrigger({ isFetching, onLoadMore }: IInfiniteScrollTriggerProps) {
	const handleInView = (isInView: boolean) => {
		if (isInView) onLoadMore();
	};

	return (
		<InView as="div" data-testid="infinite-scroll-trigger" onChange={handleInView}>
			<BntStack alignItems="center" justifyContent="center" sx={{ minHeight: 48, py: 2 }}>
				<CircularProgress size={24} sx={{ visibility: isFetching ? "visible" : "hidden" }} />
			</BntStack>
		</InView>
	);
}
