import { useEffect, useRef, useState } from "react";

import { FEED_LOADER_EXIT_MS } from "../config/feed-motion";

// Keep the loading illustration mounted while its exit animation plays.
export const useFeedEntrance = (isLoading: boolean) => {
	const [isLeaving, setIsLeaving] = useState(false);
	const wasLoadingRef = useRef(isLoading);

	useEffect(() => {
		const wasLoading = wasLoadingRef.current;
		wasLoadingRef.current = isLoading;
		if (!wasLoading || isLoading) return undefined;

		setIsLeaving(true);
		const timeout = setTimeout(() => setIsLeaving(false), FEED_LOADER_EXIT_MS);

		return () => clearTimeout(timeout);
	}, [isLoading]);

	return { isLeaving };
};
