import { mockAccountOperations } from "./support/account-operations-page";
import { mockDashboard } from "./support/dashboard-page";
import { expect, test, visitAuthorized } from "./support/fixtures";

for (const theme of ["light", "dark"]) {
	test(`renders notification without avatar in ${theme} theme`, async ({ page, api }) => {
		mockDashboard(api);
		await visitAuthorized(page, "/", {}, theme);

		const card = page.getByTestId("event-card-notification").first();
		await expect(card).toBeVisible();
		await expect(card.locator(".MuiCardHeader-avatar")).toHaveCount(0);
		await expect(card.locator(".MuiCardHeader-root")).toHaveCSS("padding-top", "10px");
	});
}

test("opens unified account history from balance", async ({ page, api }) => {
	mockDashboard(api);
	mockAccountOperations(api);
	await visitAuthorized(page, "/");
	await page.getByTestId("dashboard-widget-balance-overview").locator("button").first().click();
	await expect(page).toHaveURL("/account_operations/1");
	await expect(page.getByTestId("account-operation-row")).toHaveCount(3);
});
