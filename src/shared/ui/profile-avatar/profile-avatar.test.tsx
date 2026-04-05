import { describe, expect, it } from "vitest";

import { ProfileAvatar } from "./profile-avatar";
import { render, screen } from "@testing-library/react";

describe("ProfileAvatar", () => {
	it("renders an avatar image when avatarUrl is provided", () => {
		render(<ProfileAvatar avatarUrl="https://example.com/avatar.png" name="Tony Stark" />);

		const image = screen.getByRole("img", { name: "Tony Stark" }) as HTMLImageElement;

		expect(image).toBeTruthy();
		expect(image.getAttribute("src")).toContain("https://example.com/avatar.png");
	});

	it("renders fallback content when avatarUrl is missing", () => {
		render(<ProfileAvatar fallback={<span data-testid="avatar-fallback">A</span>} />);

		expect(screen.getByTestId("avatar-fallback")).toBeTruthy();
		expect(screen.queryByRole("img")).toBeNull();
	});

	it("shows online badge when badge is enabled and user is online", () => {
		const { container } = render(<ProfileAvatar hasOnlineBadge isOnline fallback={<span>F</span>} />);

		const badge = container.querySelector(".MuiBadge-badge");

		expect(badge).toBeTruthy();
		expect(badge?.classList.contains("MuiBadge-invisible")).toBe(false);
	});

	it("hides online badge when badge is enabled and user is offline", () => {
		const { container } = render(<ProfileAvatar hasOnlineBadge isOnline={false} fallback={<span>F</span>} />);

		const badge = container.querySelector(".MuiBadge-badge");

		expect(badge).toBeTruthy();
		expect(badge?.classList.contains("MuiBadge-invisible")).toBe(true);
	});
});
