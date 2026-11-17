import { DASHBOARD_EVENTS_RESPONSE, mockDashboard } from "./support/dashboard-page";
import { expectCompactHeader, openFeedSearch } from "./support/feed-layout";
import { expect, test, viewports, visitAuthorized } from "./support/fixtures";

for (const viewport of [...viewports, { name: "narrow", width: 320, height: 720 }])
	test.describe(viewport.name, () => {
		test.use({ viewport });
		test("keeps navigation, search and giving in one row", async ({ page, api }) => {
			mockDashboard(api);
			await visitAuthorized(page, "/", { locale: "ru" });
			const header = page.getByTestId("event-feed-header");
			await expectCompactHeader(header);
			await expect(header.getByRole("button", { name: "Все записи", exact: true })).toHaveAttribute("aria-pressed", "true");
			await header.getByRole("button", { name: "С моим участием", exact: true }).click();
			await expect(header.getByRole("button", { name: "С моим участием", exact: true })).toHaveAttribute("aria-pressed", "true");
			await expect(header.getByTestId("event-feed-give-button")).toHaveCSS("height", "40px");
			await openFeedSearch(header);
			await header.locator("input").fill("Спасибо");
			await expectCompactHeader(header);
			await expect(header.getByTestId("event-feed-give-button")).toBeVisible();
			await header.locator("input").press("Escape");
			await expect(header.locator("input")).toHaveValue("");
			if (await header.evaluate((el) => el.getBoundingClientRect().width >= 660)) {
				await expect(header.locator("input")).toBeVisible();
			} else {
				await expect(header.locator("input")).toBeHidden();
				await expect(header.getByRole("button", { name: "Поиск", exact: true })).toBeFocused();
			}
			await expect(header.getByRole("button", { name: "С моим участием", exact: true })).toBeVisible();
		});
		test("shows local loader and ignores stale response after returning", async ({ page, api }) => {
			mockDashboard(api);
			api.mock("GET", "/events", {
				body: {
					data: Array.from({ length: 30 }, (_, index) => ({
						...DASHBOARD_EVENTS_RESPONSE.data[0],
						id: String(101 + index),
						attributes: { ...DASHBOARD_EVENTS_RESPONSE.data[0].attributes, id: 101 + index },
					})),
				},
				headers: { "Per-Page": "30", Total: "30" },
			});
			api.mock("GET", "/events/pinned", { body: DASHBOARD_EVENTS_RESPONSE });
			await visitAuthorized(page, "/", { locale: "ru" });
			const header = page.getByTestId("event-feed-header");
			const list = page.getByTestId("dashboard-event-list");
			await expect(list).toContainText("This is a private notification");
			await expect(page.getByTestId("pinned-events-strip")).toBeVisible();
			let release!: () => void;
			const pending = new Promise<void>((resolve) => {
				release = resolve;
			});
			api.mock("GET", "/events", async (request) => {
				if (new URL(request.url()).searchParams.get("showMine") === "true") {
					await pending;
					return {
						body: { data: DASHBOARD_EVENTS_RESPONSE.data.map((event) => ({ ...event, attributes: { ...event.attributes, content: "Personal response" } })) },
						headers: { "Per-Page": "1", Total: "1" },
					};
				}
				return { body: DASHBOARD_EVENTS_RESPONSE, headers: { "Per-Page": "1", Total: "1" } };
			});
			try {
				await page.addStyleTag({ content: '[data-testid="event-feed-filter-loading"] { animation: none !important; }' });
				await header.getByRole("button", { name: "С моим участием", exact: true }).click();
				const loader = page.getByTestId("event-feed-filter-loading");
				await expect(loader).toBeVisible();
				await expect(list.locator("[inert]")).toHaveCSS("opacity", "0.45");
				await expect(list.locator("[inert]")).toContainText("This is a private notification");
				await expect(header.getByTestId("event-feed-give-button")).toBeEnabled();
				await loader.evaluate((element) => {
					let container = element.parentElement;
					while (container && !(container.scrollHeight > container.clientHeight && /auto|scroll/.test(getComputedStyle(container).overflowY))) container = container.parentElement;
					if (!container) throw new Error("Feed scroll container is missing");
					container.scrollTop += 400;
				});
				await expect
					.poll(() =>
						loader.evaluate((el) => {
							const rect = el.getBoundingClientRect();
							return rect.top >= 0 && rect.bottom <= innerHeight;
						})
					)
					.toBe(true);
				await header.getByRole("button", { name: "Все записи", exact: true }).click();
				await expect(loader).toHaveCount(0);
				const response = page.waitForResponse((r) => new URL(r.url()).searchParams.get("showMine") === "true");
				release();
				await response;
				await expect(list).not.toContainText("Personal response");
				await expect(loader).toHaveCount(0);
			} finally {
				release();
			}
		});
	});
