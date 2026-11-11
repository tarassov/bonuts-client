import { Suspense, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { describe, expect, it, vi } from "vitest";

import { EventFeedFilter } from "./event-feed-filter";
import { fireEvent, render, screen } from "@testing-library/react";
import lightTheme from "@/themes/light-theme";

const pendingFeed = new Promise<never>(() => undefined);

function PendingFeed({ isPending }: { isPending: boolean }) {
	if (isPending) throw pendingFeed;

	return null;
}

function FeedWithPendingUpdate() {
	const [showMine, setShowMine] = useState(false);

	return (
		<Suspense fallback={<span>Loading</span>}>
			<EventFeedFilter showMine={showMine} onShowMineChange={setShowMine} />
			<PendingFeed isPending={showMine} />
		</Suspense>
	);
}

describe("EventFeedFilter", () => {
	it("moves the selection before the feed update completes", () => {
		render(
			<ThemeProvider theme={createTheme(lightTheme)}>
				<FeedWithPendingUpdate />
			</ThemeProvider>
		);
		const buttons = screen.getAllByRole("button");

		fireEvent.click(buttons[1]);

		expect(buttons[1].getAttribute("aria-pressed")).toBe("true");
		expect(buttons[0].getAttribute("aria-pressed")).toBe("false");
		expect(screen.queryByText("Loading")).toBeNull();
		fireEvent.click(buttons[0]);
		expect(buttons[0].getAttribute("aria-pressed")).toBe("true");
	});

	it.each([false, true])("keeps one mode selected when showMine is %s", (showMine) => {
		const onShowMineChange = vi.fn();
		render(
			<ThemeProvider theme={createTheme(lightTheme)}>
				<EventFeedFilter showMine={showMine} onShowMineChange={onShowMineChange} />
			</ThemeProvider>
		);
		const buttons = screen.getAllByRole("button");
		const selected = buttons[showMine ? 1 : 0];
		const other = buttons[showMine ? 0 : 1];

		expect(selected.getAttribute("aria-pressed")).toBe("true");
		expect(other.getAttribute("aria-pressed")).toBe("false");
		fireEvent.click(selected);
		expect(onShowMineChange).not.toHaveBeenCalled();
		fireEvent.click(other);
		expect(onShowMineChange).toHaveBeenCalledExactlyOnceWith(!showMine);
	});
});
