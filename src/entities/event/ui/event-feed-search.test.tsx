import { createTheme, ThemeProvider } from "@mui/material/styles";

import { afterEach, describe, expect, it, vi } from "vitest";

import { EventFeedSearch } from "./event-feed-search";
import { act, fireEvent, render, screen } from "@testing-library/react";
import lightTheme from "@/themes/light-theme";

function renderSearch() {
	const onSearchTextChange = vi.fn();
	render(
		<ThemeProvider theme={createTheme(lightTheme)}>
			<EventFeedSearch onSearchTextChange={onSearchTextChange} />
		</ThemeProvider>
	);

	return onSearchTextChange;
}

describe("EventFeedSearch", () => {
	afterEach(() => vi.useRealTimers());

	it("focuses the revealed field, debounces searching and clears on Escape", () => {
		vi.useFakeTimers();
		const onSearchTextChange = renderSearch();
		const button = screen.getByRole("button");
		expect(screen.queryByRole("textbox")).toBeNull();
		fireEvent.click(button);
		const input = screen.getByRole("textbox");
		expect(document.activeElement).toBe(input);
		fireEvent.change(input, { target: { value: "thanks" } });
		act(() => vi.advanceTimersByTime(499));
		expect(onSearchTextChange).not.toHaveBeenCalled();
		act(() => vi.advanceTimersByTime(1));
		expect(onSearchTextChange).toHaveBeenCalledExactlyOnceWith("thanks");

		fireEvent.keyDown(input, { key: "Escape" });
		expect(onSearchTextChange).toHaveBeenLastCalledWith("");
		expect(screen.queryByRole("textbox")).toBeNull();
		expect(document.activeElement).toBe(screen.getByRole("button"));
		fireEvent.click(screen.getByRole("button"));
		expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe("");
	});

	it("cancels pending search when closed so a stale request cannot restore the filter", () => {
		vi.useFakeTimers();
		const onSearchTextChange = renderSearch();
		const button = screen.getByRole("button");
		fireEvent.click(button);
		fireEvent.change(screen.getByRole("textbox"), { target: { value: "thanks" } });
		fireEvent.click(screen.getByRole("button", { name: /close search/i }));
		act(() => vi.advanceTimersByTime(500));

		expect(onSearchTextChange).toHaveBeenCalledExactlyOnceWith("");
		expect(screen.queryByRole("textbox")).toBeNull();
	});
});
