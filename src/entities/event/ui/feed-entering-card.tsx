import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { EventCardStyled } from "./event-card-styled";
import { FeedCardEntrance } from "./event-feed-loading.styles";
import type { TPost } from "@/types/model/post";

export function FeedEnteringCard({ post, index, showInitialDrop, scrollRoot }: { post: TPost; index: number; showInitialDrop: boolean; scrollRoot: Element | null }) {
	const [hasInitialDrop, setHasInitialDrop] = useState(false);
	const { ref, inView } = useInView({ root: scrollRoot, rootMargin: "-12px 0px", fallbackInView: true });

	useEffect(() => {
		if (showInitialDrop && inView) setHasInitialDrop(true);
	}, [showInitialDrop, inView]);

	return (
		<FeedCardEntrance ref={ref} index={index} hasInitialDrop={hasInitialDrop} isInView={inView}>
			<EventCardStyled post={post} maxWidth={760} />
		</FeedCardEntrance>
	);
}
