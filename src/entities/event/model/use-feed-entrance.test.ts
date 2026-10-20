import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { FEED_LOADER_EXIT_MS } from "../config/feed-motion";

import { useFeedEntrance } from "./use-feed-entrance";
import { act, renderHook } from "@testing-library/react";

describe("useFeedEntrance", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("does not animate a feed that was never loading", () => {
		const { result } = renderHook(() => useFeedEntrance(false));

		expect(result.current).toEqual({ generation: 0, isLeaving: false, isAnimated: false });
	});

	it("starts the exit and a new generation when loading finishes", () => {
		const { result, rerender } = renderHook(({ isLoading }) => useFeedEntrance(isLoading), { initialProps: { isLoading: true } });

		expect(result.current.isLeaving).toBe(false);

		rerender({ isLoading: false });

		expect(result.current).toEqual({ generation: 1, isLeaving: true, isAnimated: true });

		act(() => {
			vi.advanceTimersByTime(FEED_LOADER_EXIT_MS);
		});

		expect(result.current.isLeaving).toBe(false);
		expect(result.current.generation).toBe(1);
	});

	it("replays the entrance on every finished load", () => {
		const { result, rerender } = renderHook(({ isLoading }) => useFeedEntrance(isLoading), { initialProps: { isLoading: true } });

		rerender({ isLoading: false });
		rerender({ isLoading: true });
		rerender({ isLoading: false });

		expect(result.current.generation).toBe(2);
	});
});
