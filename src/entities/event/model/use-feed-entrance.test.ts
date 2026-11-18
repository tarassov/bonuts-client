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

	it("does not start an exit for a feed that was never loading", () => {
		const { result } = renderHook(() => useFeedEntrance(false));

		expect(result.current).toEqual({ isLeaving: false });
	});

	it("starts the exit when loading finishes", () => {
		const { result, rerender } = renderHook(({ isLoading }) => useFeedEntrance(isLoading), { initialProps: { isLoading: true } });

		expect(result.current.isLeaving).toBe(false);

		rerender({ isLoading: false });

		expect(result.current).toEqual({ isLeaving: true });

		act(() => {
			vi.advanceTimersByTime(FEED_LOADER_EXIT_MS);
		});

		expect(result.current.isLeaving).toBe(false);
	});

	it("replays the loader exit on every finished load", () => {
		const { result, rerender } = renderHook(({ isLoading }) => useFeedEntrance(isLoading), { initialProps: { isLoading: true } });

		rerender({ isLoading: false });
		act(() => {
			vi.advanceTimersByTime(FEED_LOADER_EXIT_MS);
		});
		expect(result.current.isLeaving).toBe(false);
		rerender({ isLoading: true });
		rerender({ isLoading: false });

		expect(result.current.isLeaving).toBe(true);
	});
});
