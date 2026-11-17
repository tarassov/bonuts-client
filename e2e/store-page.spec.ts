import { expect, test, viewports, visitAuthorized } from "./support/fixtures";
import { mockStore } from "./support/rewards";

for (const viewport of viewports)
	test.describe(viewport.name, () => {
		test.use({ viewport });
		test("shows catalog and filters by name and status", async ({ page, api }) => {
			mockStore(api);
			await visitAuthorized(page, "/store-manager");
			await expect(page.getByRole("heading", { level: 1, name: "Store showcase" })).toBeVisible();
			await expect(page.getByTestId("store-reward-card")).toHaveCount(3);
			expect(api.calls("GET", "/donuts")).toHaveLength(2);
			await expect(page.locator('[aria-label="Store statistics"]').getByText("Total rewards").locator("..")).toContainText("3");
			await page.locator('input[name="store-reward-search"]').fill("coffee");
			await expect(page.getByTestId("store-reward-card")).toHaveCount(1);
			await expect(page.getByTestId("store-reward-card")).toContainText("Coffee voucher");
			await page.locator('input[name="store-reward-search"]').fill("");
			await page.getByRole("tab", { name: /^Inactive/ }).click();
			await expect(page.getByTestId("store-reward-card")).toHaveCount(1);
			await expect(page.getByTestId("store-reward-card")).toContainText("Team mug");
		});
	});
