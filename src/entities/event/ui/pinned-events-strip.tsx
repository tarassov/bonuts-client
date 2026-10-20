import { useCallback, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_p } from "services/localization/texts";

import { usePinnedStripState } from "../model/use-pinned-strip-state";

import { PinnedEventsPanel } from "./pinned-events-panel";
import { PinnedEventsStripCollapsed } from "./pinned-events-strip-collapsed";
import { PinnedArea } from "./pinned-events-strip-styled";
import type { TPost } from "@/types/model/post";

type TPinnedEventsStripProps = {
	posts: Array<TPost>;
	className?: string;
};

// Pinned posts on top of the feed: one sticky line when collapsed, a highlighted panel when expanded.
export function PinnedEventsStrip({ posts, className }: TPinnedEventsStripProps) {
	const { translate } = useBntTranslate();
	const total = posts.length;
	const { index, isOpen, isListOpen, toggleOpen, close, toggleList, select } = usePinnedStripState(total);
	const areaRef = useRef<HTMLDivElement | null>(null);
	const { ref: inViewRef, inView } = useInView({ threshold: 0, skip: !isOpen, fallbackInView: true });
	const wasInView = useRef(false);

	const setAreaRef = useCallback(
		(node: HTMLDivElement | null) => {
			areaRef.current = node;
			inViewRef(node);
		},
		[inViewRef]
	);

	// the expanded panel leaves the sticky position, so bring it into view where it now sits in the feed
	useEffect(() => {
		if (!isOpen) return;
		areaRef.current?.scrollIntoView?.({ block: "start", behavior: "smooth" });
	}, [isOpen]);

	// once the expanded panel has been seen and then scrolled away, fold it back into the sticky strip
	useEffect(() => {
		if (!isOpen) {
			wasInView.current = false;
			return;
		}
		if (inView) {
			wasInView.current = true;
			return;
		}
		if (wasInView.current) close();
	}, [close, inView, isOpen]);

	if (!posts[index]) return null;

	const label = total > 1 ? translate(texts_p.pinned_position, { current: index + 1, total }) : translate(texts_p.pinned, { capitalize: true });

	return (
		<PinnedArea ref={setAreaRef} isExpanded={isOpen} className={className} data-testid="pinned-events-strip">
			{isOpen ? (
				<PinnedEventsPanel posts={posts} index={index} label={label} isListOpen={isListOpen} onClose={toggleOpen} onSelect={select} onToggleList={toggleList} />
			) : (
				<PinnedEventsStripCollapsed posts={posts} index={index} label={label} onToggle={toggleOpen} />
			)}
		</PinnedArea>
	);
}
