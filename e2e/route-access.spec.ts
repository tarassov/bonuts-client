import { expect, test, viewports, visitAuthorized } from "./support/fixtures";
import { PROFILE_RESPONSE } from "./support/fixtures/profile-response";

for (const viewport of viewports) {
	test.describe(viewport.name, () => {
		test.use({ viewport });

		test("redirects anonymous visitors from team settings to login", async ({ page }) => {
			await page.goto("/tenant");
			await expect(page).toHaveURL("/login");
			await expect(page.locator("#email")).toBeVisible();
			await expect(page.locator('input[name="caption"]')).toHaveCount(0);
		});

		test("denies team settings to a member without admin roles", async ({ page, api }) => {
			api.mock("GET", "/profile", {
				body: { ...PROFILE_RESPONSE, data: { ...PROFILE_RESPONSE.data, attributes: { ...PROFILE_RESPONSE.data.attributes, admin: false, store_admin: false, roles: [] } } },
			});
			await visitAuthorized(page, "/tenant");
			await expect(page).toHaveURL("/tenant");
			await expect(page.getByRole("heading", { name: "Access denied", exact: true })).toBeVisible();
			await expect(page.locator('input[name="caption"]')).toHaveCount(0);
		});

		test("redirects signed-in visitors without a tenant to welcome", async ({ page, api }) => {
			api.mock("GET", "/tenants", { body: { data: [] } });
			api.mock("GET", "/tenants/accessible", { body: { data: [] } });
			api.mock("GET", "/invitations/my", { body: { data: [] } });
			await visitAuthorized(page, "/tenant", { tenant: "" });
			await expect(page).toHaveURL("/welcome");
			await expect(page.locator('input[name="caption"]')).toHaveCount(0);
		});
	});
}
