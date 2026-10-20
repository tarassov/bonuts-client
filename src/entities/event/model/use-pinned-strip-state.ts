import { useCallback, useEffect, useState } from "react";

// Which pinned post is shown, whether the strip is expanded and whether the full list is open.
export const usePinnedStripState = (total: number) => {
	const [index, setIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [isListOpen, setIsListOpen] = useState(false);

	useEffect(() => {
		if (index >= total) setIndex(0);
	}, [index, total]);

	const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);
	const close = useCallback(() => setIsOpen(false), []);
	const toggleList = useCallback(() => setIsListOpen((prev) => !prev), []);
	const select = useCallback((nextIndex: number) => {
		setIndex(nextIndex);
		setIsListOpen(false);
	}, []);

	return {
		index: Math.min(index, Math.max(total - 1, 0)),
		isOpen,
		isListOpen,
		toggleOpen,
		close,
		toggleList,
		select,
	};
};
