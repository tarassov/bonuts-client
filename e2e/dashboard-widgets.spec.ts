import { DASHBOARD_PROFILE_RESPONSE, mockDashboard } from "./support/dashboard-page";
import { expect, test, viewports, visitAuthorized } from "./support/fixtures";

for (const viewport of viewports)
	test.describe(viewport.name, () => {
		test.use({ viewport });
		for (const theme of ["light", "dark"])
			test(`shows weekly recognition and status in ${theme}`, async ({ page, api }) => {
				mockDashboard(api);
				api.mock("GET", "/donuts", { body: { data: [] }, headers: { "Per-Page": "24", Total: "0" } });
				await visitAuthorized(page, "/", { locale: "ru" }, theme);
				const sidebar = page.getByTestId("dashboard-social-sidebar");
				await expect(sidebar.locator(":scope > *")).toHaveCount(3);
				await expect(sidebar).toContainText("Баланс");
				if (viewport.name === "mobile") {
					for (const index of [0, 1, 2]) await sidebar.locator(":scope > *").nth(index).locator('button[aria-expanded="false"]').click();
				}
				await expect(page.getByTestId("dashboard-widget-your-status")).toContainText("Share donuts with a colleague");
				await expect(page.getByTestId("dashboard-widget-your-status").getByRole("progressbar")).toHaveCount(0);
				for (const count of [4, 3, 2, 5]) {
					const heading = page.getByTestId("dashboard-widget-current-week-statistics").getByRole("heading", { level: 6, name: String(count), exact: true });
					await heading.scrollIntoViewIfNeeded();
					await expect(heading).toBeVisible();
				}
				await expect(page.getByTestId("dashboard-widget-leaderboard")).toContainText("Bruce Wayne");
				await expect(page.getByTestId("dashboard-widget-leaderboard")).toContainText("Recognition Rocket");
				expect(await sidebar.evaluate((el) => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
				const link = page.getByTestId("dashboard-widget-balance-overview").locator("a");
				await expect(link).toHaveAttribute("href", "/donuts");
				await link.click();
				await expect(page).toHaveURL("/donuts");
			});
		test("keeps status available without accounts", async ({ page, api }) => {
			mockDashboard(api);
			api.mock("GET", "/profile", {
				body: { ...DASHBOARD_PROFILE_RESPONSE, data: { ...DASHBOARD_PROFILE_RESPONSE.data, attributes: { ...DASHBOARD_PROFILE_RESPONSE.data.attributes, self_account: null, distrib_account: null } } },
			});
			await visitAuthorized(page, "/", { locale: "ru" });
			if (viewport.name === "mobile") await page.getByTestId("dashboard-social-sidebar").locator(":scope > *").nth(1).locator('button[aria-expanded="false"]').click();
			await expect(page.getByTestId("dashboard-widget-balance-overview")).toHaveCount(0);
			await expect(page.getByTestId("dashboard-widget-your-status")).toBeVisible();
		});
	});
