import { mockAccountOperations } from "./support/account-operations-page";
import { expect, test, viewports, visitAuthorized } from "./support/fixtures";

for (const viewport of viewports)
	test.describe(viewport.name, () => {
		test.use({ viewport });
		test.beforeEach(async ({ page, api }) => {
			mockAccountOperations(api);
			await visitAuthorized(page, "/account_operations/1");
			await expect(page.getByTestId("account-operation-row")).toHaveCount(3);
		});
		test("shows unified summary and history", async ({ page }) => {
			for (const text of ["125", "+29", "+7"]) await expect(page.getByTestId("account-operations-summary")).toContainText(text);
			await expect(page.getByText("Hoodie Bonuts", { exact: true })).toBeVisible();
			await expect(page.getByText("Balance now", { exact: true })).toHaveCount(0);
		});
		test("applies account, operation, search and period filters", async ({ page, api }) => {
			if (viewport.name === "mobile") await page.getByRole("button", { name: "Operation filters", exact: true }).click();
			await page.getByTestId("account-type-coin").click();
			await expect.poll(() => api.calls("GET", "/account_operations/history").map((r) => new URL(r.url()).searchParams.get("account_type"))).toContain("self");
			await page.getByTestId("operation-filter-purchase").click();
			await expect.poll(() => api.calls("GET", "/account_operations/history").map((r) => new URL(r.url()).searchParams.get("operation_type"))).toContain("purchase");
			await page.locator('input[name="account-operations-search"]').fill("Hoodie");
			await expect.poll(() => api.calls("GET", "/account_operations/history").map((r) => new URL(r.url()).searchParams.get("search"))).toContain("Hoodie");
			if (viewport.name === "mobile") await page.getByRole("button", { name: "Period filter", exact: true }).click();
			await page.getByTestId("period-filter-30-days").click();
			await expect.poll(() => new URL(api.calls("GET", "/account_operations/history").at(-1)!.url()).searchParams.get("date_from")).toBeTruthy();
		});
	});
