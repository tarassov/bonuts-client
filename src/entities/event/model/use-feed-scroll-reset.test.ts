import { describe, expect, it, vi } from "vitest";

import { useFeedScrollReset } from "./use-feed-scroll-reset";
import { renderHook } from "@testing-library/react";

describe("useFeedScrollReset", () => {
	it.each([false, true])("resets filtering, searching and clearing on mobile=%s", (isMobile) => {
		const { result, rerender } = renderHook(({ showMine, searchText }) => useFeedScrollReset(showMine, searchText, isMobile), { initialProps: { showMine: false, searchText: "" } });
		const feed = document.createElement("div");
		const scrollArea = document.createElement("div");
		feed.scrollIntoView = vi.fn();
		scrollArea.scrollTo = vi.fn();
		result.current.feedRef.current = feed;
		result.current.scrollAreaRef.current = scrollArea;

		for (const filter of [
			{ showMine: true, searchText: "" },
			{ showMine: true, searchText: "thanks" },
			{ showMine: true, searchText: "" },
			{ showMine: false, searchText: "" },
		]) {
			vi.mocked(scrollArea.scrollTo).mockClear();
			vi.mocked(feed.scrollIntoView).mockClear();
			rerender(filter);

			expect(scrollArea.scrollTo).toHaveBeenCalledExactlyOnceWith({ top: 0, behavior: "instant" });
			expect(feed.scrollIntoView).toHaveBeenCalledTimes(isMobile ? 1 : 0);
			if (isMobile) expect(feed.scrollIntoView).toHaveBeenCalledWith({ block: "start", behavior: "instant" });
		}

		vi.mocked(scrollArea.scrollTo).mockClear();
		vi.mocked(feed.scrollIntoView).mockClear();
		rerender({ showMine: false, searchText: "" });
		expect(scrollArea.scrollTo).not.toHaveBeenCalled();
		expect(feed.scrollIntoView).not.toHaveBeenCalled();
	});
});
