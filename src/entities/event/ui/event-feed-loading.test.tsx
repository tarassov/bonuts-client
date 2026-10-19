import { createTheme, ThemeProvider } from "@mui/material/styles";

import { describe, expect, it } from "vitest";

import { EventFeedLoading } from "./event-feed-loading";
import { render, screen } from "@testing-library/react";
import lightTheme from "@/themes/light-theme";

describe("EventFeedLoading", () => {
	it("announces the loading feed with three donuts", () => {
		render(
			<ThemeProvider theme={createTheme(lightTheme)}>
				<EventFeedLoading />
			</ThemeProvider>
		);

		const status = screen.getByRole("status");

		expect(status.getAttribute("aria-busy")).toBe("true");
		expect(status.textContent).toMatch(/gathering appreciation/i);
		expect(status.querySelectorAll("[aria-hidden] > div")).toHaveLength(3);
	});
});
