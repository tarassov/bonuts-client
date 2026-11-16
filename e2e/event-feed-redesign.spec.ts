import { DASHBOARD_EVENTS_RESPONSE, mockDashboard } from "./support/dashboard-page";
import { expect, test, visitAuthorized } from "./support/fixtures";

for (const viewport of [
	{ name: "desktop", width: 1280, height: 720 },
	{ name: "narrow", width: 320, height: 720 },
])
	test.describe(viewport.name, () => {
		test.use({ viewport });
		for (const theme of ["light", "dark"])
			test(`keeps recognition readable and sidebar stationary in ${theme}`, async ({ page, api }) => {
				mockDashboard(api);
				api.mock("GET", "/events", {
					body: {
						data: Array.from({ length: 12 }, (_, index) => ({
							...DASHBOARD_EVENTS_RESPONSE.data[0],
							id: String(200 + index),
							attributes: {
								...DASHBOARD_EVENTS_RESPONSE.data[0].attributes,
								id: 200 + index,
								date_string_utc: index < 6 ? "2026-11-14T10:00:00Z" : "2026-11-13T10:00:00Z",
								public: true,
								user_name: "Александра Константинопольская",
								position: "Поддержка команды",
								content: "Спасибо за помощь с запуском проекта! Благодаря тебе команда справилась вовремя.",
								operation: { id: 200 + index, deal_type: "share", amount: 5, direction: 1, to_profile: { id: 2, name: "Константин Александровский", position: "Разработчик" } },
							},
						})),
					},
					headers: { "Per-Page": "12", Total: "12" },
				});
				await visitAuthorized(page, "/", { locale: "ru" }, theme);
				const back = page.getByRole("button", { name: "Наверх", exact: true });
				await expect(back).toHaveCount(0);
				const card = page.getByTestId("event-card-public").first();
				await expect(card).toBeVisible();
				await expect(card.getByTestId("event-recognition-header")).toContainText("+5");
				await expect(card.getByRole("button", { name: /Александра Константинопольская/ })).toBeVisible();
				await expect(card.getByRole("button", { name: /Константин Александровский/ })).toBeVisible();
				expect(await card.evaluate((el) => [el, ...el.querySelectorAll("button")].every((item) => item.scrollWidth <= item.clientWidth + 1))).toBe(true);
				const markers = page.getByTestId("feed-day-marker");
				await expect(markers).toHaveCount(2);
				const scroll = page.getByTestId("dashboard-event-list").locator(".scroll");
				if (viewport.name === "desktop") {
					const top = await markers.first().evaluate((el) => el.getBoundingClientRect().top);
					await scroll.evaluate((el) => {
						el.scrollTop = 200;
					});
					await expect.poll(() => markers.first().evaluate((el) => el.getBoundingClientRect().top)).toBeLessThan(top - 100);
					await scroll.evaluate((el) => {
						el.scrollTop = 0;
					});
				}
				await page.getByTestId("event-card-public").last().scrollIntoViewIfNeeded();
				if (viewport.name === "narrow") await expect(markers.last()).toHaveCSS("justify-content", "center");
				await expect(back).toBeVisible();
				await back.click();
				await expect(back).toHaveCount(0);
				if (viewport.name === "desktop") {
					const sidebar = page.getByTestId("dashboard-social-sidebar");
					const top = await sidebar.evaluate((el) => el.getBoundingClientRect().top);
					await scroll.evaluate((el) => {
						el.scrollTop = 500;
					});
					await expect.poll(() => sidebar.evaluate((el) => el.getBoundingClientRect().top)).toBe(top);
				}
			});
	});
