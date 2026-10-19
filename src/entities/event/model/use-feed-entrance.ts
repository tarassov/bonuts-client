import { useEffect, useRef, useState } from "react";

import { FEED_LOADER_EXIT_MS } from "../config/feed-motion";

// Turns the end of a feed load into an entrance: the loader gets a short exit and the fresh cards animate in.
// `generation` changes once per finished load, so the card list can be remounted to replay the entrance.
export const useFeedEntrance = (isLoading: boolean) => {
	const [generation, setGeneration] = useState(0);
	const [isLeaving, setIsLeaving] = useState(false);
	const wasLoadingRef = useRef(isLoading);

	useEffect(() => {
		const wasLoading = wasLoadingRef.current;
		wasLoadingRef.current = isLoading;
		if (!wasLoading || isLoading) return undefined;

		setGeneration((prev) => prev + 1);
		setIsLeaving(true);
		const timeout = setTimeout(() => setIsLeaving(false), FEED_LOADER_EXIT_MS);

		return () => clearTimeout(timeout);
	}, [isLoading]);

	return { generation, isLeaving, isAnimated: generation > 0 };
};
