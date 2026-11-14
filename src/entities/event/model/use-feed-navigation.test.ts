import { describe, expect, it, vi } from "vitest";

import { useFeedNavigation } from "./use-feed-navigation";
import { act, renderHook } from "@testing-library/react";

describe("useFeedNavigation", () => {
	it("uses the feed scroll position and respects reduced motion", () => {
		const area = document.createElement("div");
		area.scrollTo = vi.fn();
		vi.stubGlobal(
			"matchMedia",
			vi.fn(() => ({ matches: true }))
		);
		const { result, unmount } = renderHook(() => useFeedNavigation({ current: area }, false));
		expect(result.current.hasDeepScroll).toBe(false);
		act(() => {
			area.scrollTop = 351;
			area.dispatchEvent(new Event("scroll"));
		});
		expect(result.current.hasDeepScroll).toBe(true);
		act(() => result.current.scrollToTop());
		expect(area.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
		unmount();
		vi.unstubAllGlobals();
	});
});
