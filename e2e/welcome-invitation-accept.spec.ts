import { mockDashboard } from "./support/dashboard-page";
import { expect, test, viewports, visitAuthorized } from "./support/fixtures";
import { WELCOME_INVITATIONS_RESPONSE } from "./support/welcome-invitation-accept-data";

for (const viewport of viewports)
	test.describe(viewport.name, () => {
		test.use({ viewport });
		test("accepts invitation and redirects to dashboard", async ({ page, api }) => {
			mockDashboard(api);
			api.mock("GET", "/invitations/my", { body: WELCOME_INVITATIONS_RESPONSE });
			api.mock("GET", "/tenants", { body: { data: [] } });
			api.mock("GET", "/tenants/accessible", { body: { data: [] } });
			api.mock("POST", "/invitations/17/accept", { body: {} });
			await visitAuthorized(page, "/welcome", { tenant: "" });
			await page.getByRole("article").filter({ hasText: "Avengers" }).getByRole("button").last().click();
			await expect(page).toHaveURL("/");
			await expect(page.getByTestId("event-feed-header")).toBeVisible();
			expect(api.calls("POST", "/invitations/17/accept")).toHaveLength(1);
			expect(await page.evaluate(() => JSON.parse(localStorage.getItem("settings") ?? "{}").tenant)).toBe("avengers");
		});
	});
