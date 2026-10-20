import { createTheme, ThemeProvider } from "@mui/material/styles";

import { describe, expect, it, vi } from "vitest";

import { PinnedEventsStrip } from "./pinned-events-strip";
import { fireEvent, render, screen } from "@testing-library/react";
import lightTheme from "@/themes/light-theme";
import type { TPost } from "@/types/model/post";

const showDetailedPost = vi.fn();

vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		i18n: { language: "en" },
		t: (key: string, options?: Record<string, unknown>) => (key === "pinned on" ? `pinned ${String(options?.date ?? "")}` : key),
	}),
}));

vi.mock("../model/use-event-ui", () => ({
	useEventUi: () => ({ showDetailedPost }),
}));

const buildPost = (id: number, userName: string, content: string): TPost => ({
	id,
	title: userName,
	content,
	public: true,
	pinned: true,
	commentable: true,
	likeable: true,
	comments: [],
	comments_count: 0,
	likes: [],
	liked: false,
	editable: false,
	date_string_utc: "2026-10-19T08:37:00.000Z",
	profile: {
		id,
		name: userName,
		user_name: userName,
		position: "Team",
		is_online: false,
	},
});

const renderStrip = (posts: Array<TPost>) =>
	render(
		<ThemeProvider theme={createTheme(lightTheme)}>
			<PinnedEventsStrip posts={posts} />
		</ThemeProvider>
	);

describe("PinnedEventsStrip", () => {
	it("expands on strip click and switches pins with the dots", () => {
		renderStrip([buildPost(1, "Mister Donut", "Congratulations to the team!"), buildPost(2, "Alex", "Friday party")]);

		expect(screen.getAllByText("Mister Donut")).toHaveLength(1);
		expect(screen.getByText("October 19")).toBeTruthy();
		expect(screen.queryByTestId("pinned-events-panel")).toBeNull();

		fireEvent.click(screen.getByTestId("pinned-events-strip-body"));

		expect(screen.getByTestId("pinned-events-panel")).toBeTruthy();
		expect(screen.getByText(/pinned October 19/)).toBeTruthy();

		fireEvent.click(screen.getAllByTestId("pinned-events-dot")[1]);

		expect(screen.getAllByText("Alex").length).toBeGreaterThan(0);
		expect(screen.queryByText("Mister Donut")).toBeNull();
	});

	it("expands the full text and opens the post from the panel", () => {
		renderStrip([buildPost(1, "Mister Donut", "Congratulations to the team!")]);

		expect(screen.queryByTestId("pinned-events-panel")).toBeNull();

		fireEvent.click(screen.getByTestId("pinned-events-strip-body"));

		expect(screen.getByTestId("pinned-events-panel")).toBeTruthy();

		fireEvent.click(screen.getByText("Open in feed"));

		expect(showDetailedPost).toHaveBeenCalledTimes(1);
	});
});
