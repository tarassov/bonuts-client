import { createTheme, ThemeProvider } from "@mui/material/styles";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { EventCard } from "./event-card";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import lightTheme from "@/themes/light-theme";
import { DealType } from "@/types/model/deal-type";
import type { TPost } from "@/types/model/post";

const showEmployeeModal = vi.fn();
const showDetailedPost = vi.fn();
const toggleLike = vi.fn();
const showResponseError = vi.fn();

vi.mock("@/entities/profile", () => ({ useEmployeeUi: () => ({ showEmployeeModal }) }));
vi.mock("../model/use-event-ui", () => ({ useEventUi: () => ({ showDetailedPost }) }));
vi.mock("../model/use-event-logic", () => ({ useEventLogic: () => ({ toggleLike }) }));
vi.mock("@/shared/ui/notification", () => ({ useNotification: () => ({ showResponseError }) }));
vi.mock("react-i18next", () => ({ useTranslation: () => ({ i18n: { language: "en" }, t: (key: string) => key }) }));

const post: TPost = {
	id: 1,
	title: "Maria",
	content: "Thank you for helping!",
	public: true,
	profile: { id: 1, user_name: "Maria", position: "Support" },
	operation: {
		id: 2,
		deal_type: DealType.Share,
		to_profile: { id: 2, name: "Alex", position: "Engineer" },
		amount: 5,
		direction: 1,
		created_at: "2026-11-13T09:00:00Z",
		created_at_utc: "2026-11-13T09:00:00Z",
	},
	likes: [],
	liked: false,
	likeable: true,
	commentable: true,
	comments: [],
	date_string_utc: "2026-11-13T09:00:00Z",
};

function renderCard(overrides: Partial<TPost> = {}, preventNewModal = false) {
	return render(
		<ThemeProvider theme={createTheme(lightTheme)}>
			<EventCard post={{ ...post, ...overrides }} preventNewModal={preventNewModal} />
		</ThemeProvider>
	);
}

describe("EventCard", () => {
	beforeEach(() => vi.clearAllMocks());

	it("keeps ordinary post headers clickable by mouse and keyboard", () => {
		renderCard({ operation: undefined, pinned: true });
		const header = screen.getByRole("button", { name: /Maria/ });
		fireEvent.click(header);
		fireEvent.keyDown(header, { key: "Enter" });
		fireEvent.keyDown(header, { key: " " });
		expect(showEmployeeModal.mock.calls).toEqual([[1], [1], [1]]);
		expect(screen.getByTestId("event-card-pinned-badge")).toBeTruthy();
	});

	it("opens each recognition participant independently and keeps the real amount", () => {
		renderCard({ pinned: true });
		fireEvent.click(screen.getByRole("button", { name: /Maria/ }));
		fireEvent.click(screen.getByRole("button", { name: /Alex/ }));
		expect(showEmployeeModal.mock.calls).toEqual([[1], [2]]);
		expect(screen.getByTestId("event-recognition-header").textContent).toContain("+5");
		expect(screen.getByTestId("event-card-pinned-badge")).toBeTruthy();
		expect(screen.getByText(post.content!)).toBeTruthy();
	});

	it("keeps like state, error handling and opening comments", async () => {
		const error = new Error("offline");
		toggleLike.mockRejectedValueOnce(error);
		renderCard({ liked: true });
		const like = screen.getByRole("button", { name: "add to favorites" });
		expect(like.getAttribute("aria-pressed")).toBe("true");
		fireEvent.click(like);
		await waitFor(() => expect(showResponseError).toHaveBeenCalledWith(error));
		fireEvent.click(screen.getByRole("button", { name: "comment" }));
		expect(showDetailedPost).toHaveBeenCalledOnce();
	});

	it("does not open another modal from the detailed card", () => {
		renderCard({}, true);
		fireEvent.click(screen.getByRole("button", { name: "comment" }));
		expect(showDetailedPost).not.toHaveBeenCalled();
	});

	it("keeps private notifications without recognition participants or social actions", () => {
		renderCard({ public: false });
		expect(screen.queryByTestId("event-recognition-header")).toBeNull();
		expect(screen.queryByRole("button", { name: "comment" })).toBeNull();
		expect(screen.queryByRole("button", { name: "add to favorites" })).toBeNull();
		expect(screen.getByTestId("event-card-notification")).toBeTruthy();
	});
});
