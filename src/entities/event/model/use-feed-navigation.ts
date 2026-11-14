import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

export function useFeedNavigation(scrollAreaRef: RefObject<HTMLDivElement | null>, isMobile: boolean) {
	const scrollTargetRef = useRef<HTMLElement | Window>(window);
	const [hasDeepScroll, setHasDeepScroll] = useState(false);

	useEffect(() => {
		const area = scrollAreaRef.current;
		if (!area) return;
		let target: HTMLElement | Window = area;
		if (isMobile) {
			let ancestor = area.parentElement;
			while (ancestor && !/(auto|scroll)/.test(getComputedStyle(ancestor).overflowY)) ancestor = ancestor.parentElement;
			target = ancestor || window;
		}
		scrollTargetRef.current = target;
		const update = () => {
			const offset = target === window ? window.scrollY : (target as HTMLElement).scrollTop;
			setHasDeepScroll(offset > 350);
		};
		update();
		target.addEventListener("scroll", update, { passive: true });

		return () => target.removeEventListener("scroll", update);
	}, [isMobile, scrollAreaRef]);

	const scrollToTop = () => {
		const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
		scrollTargetRef.current.scrollTo({ top: 0, behavior });
	};

	return { hasDeepScroll, scrollToTop };
}
