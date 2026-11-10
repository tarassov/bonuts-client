import { createTheme, ThemeProvider } from "@mui/material/styles";

import { afterEach, describe, expect, it, vi } from "vitest";

import { EventFeedFilterLoading } from "./event-feed-filter-loading";
import { act, render, screen } from "@testing-library/react";
import lightTheme from "@/themes/light-theme";

describe("EventFeedFilterLoading", () => {
	afterEach(() => vi.useRealTimers());

	it("shows the loader after 250 ms without relying on CSS animation", () => {
		vi.useFakeTimers();
		render(
			<ThemeProvider theme={createTheme(lightTheme)}>
				<EventFeedFilterLoading />
			</ThemeProvider>
		);

		act(() => vi.advanceTimersByTime(249));
		expect(screen.queryByRole("status")).toBeNull();
		act(() => vi.advanceTimersByTime(1));
		expect(screen.getByRole("status").getAttribute("aria-label")).toMatch(/loading/i);
	});
});
