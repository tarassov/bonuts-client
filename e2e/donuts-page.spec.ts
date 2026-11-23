import { expect, test, viewports, visitAuthorized } from "./support/fixtures";
import { mockDonuts } from "./support/rewards";

for (const viewport of viewports)
	test.describe(viewport.name, () => {
		test.use({ viewport });
		test.beforeEach(async ({ page, api }) => {
			mockDonuts(api);
			await visitAuthorized(page, "/donuts");
			await expect(page.getByTestId("donut-card").nth(1)).toBeVisible();
		});
		test("shows and filters catalog with pagination", async ({ page, api }) => {
			await page.locator("main").evaluate((element) => element.lastElementChild?.scrollIntoView({ block: "end" }));
			await expect(page.getByTestId("donut-card")).toHaveCount(3);
			expect(api.calls("GET", "/donuts")).toHaveLength(2);
			const coffee = page.getByTestId("donut-card").filter({ hasText: "Coffee voucher" });
			await expect(coffee).toContainText("80");
			await expect(coffee).toContainText("4");
			await page.locator('input[name="donut-search"]').fill(" coffee ");
			await expect(page.getByTestId("donut-card")).toHaveCount(1);
			await expect(coffee).toBeVisible();
			expect(Object.fromEntries(new URL(api.calls("GET", "/donuts").at(-1)!.url()).searchParams)).toMatchObject({ page: "1", search_text: "coffee", sort: "alphabet" });
		});
		test("sorts rewards by price", async ({ page, api }) => {
			await page.getByRole("button", { name: /сначала самые дорогие/i }).click();
			await expect(page.getByTestId("donut-card").nth(0)).toContainText("Hoodie Bonuts");
			await expect(page.getByTestId("donut-card").nth(1)).toContainText("Coffee voucher");
			await expect.poll(() => new URL(api.calls("GET", "/donuts").at(-1)!.url()).searchParams.get("sort")).toBe("price_desc");
			await page.getByRole("button", { name: /сначала самые дешевые/i }).click();
			await expect(page.getByTestId("donut-card").nth(0)).toContainText("Team mug");
			await expect(page.getByTestId("donut-card").nth(1)).toContainText("Coffee voucher");
			expect(new URL(api.calls("GET", "/donuts").at(-1)!.url()).searchParams.get("sort")).toBe("price_asc");
		});
		test("opens selected reward", async ({ page, api }) => {
			await page.getByTestId("donut-card").filter({ hasText: "Coffee voucher" }).click();
			await expect(page).toHaveURL("/d/2");
			await expect.poll(() => api.calls("GET", "/donuts/2").length).toBe(1);
		});
		test("does not render missing description as null", async ({ page, api }) => {
			await page.locator("main").evaluate((element) => element.lastElementChild?.scrollIntoView({ block: "end" }));
			await expect(page.getByTestId("donut-card")).toHaveCount(3);
			await page.getByTestId("donut-card").filter({ hasText: "Team mug" }).click();
			await expect(page).toHaveURL("/d/3");
			await expect.poll(() => api.calls("GET", "/donuts/3").length).toBe(1);
			await expect(page.getByText(/^null$/i)).toHaveCount(0);
		});
		test("purchases affordable reward directly from card", async ({ page, api }) => {
			const coffee = page.getByTestId("donut-card").filter({ hasText: "Coffee voucher" });
			await expect(page.getByTestId("donut-card").filter({ hasText: "Hoodie Bonuts" }).getByTestId("donut-purchase-button")).toHaveCount(0);
			await coffee.getByTestId("donut-purchase-button").click();
			await expect(coffee.getByTestId("donut-purchase-confirmation")).toBeVisible();
			await expect(coffee).toContainText("3");
			expect(api.calls("POST", "/requests")[0].postDataJSON()).toMatchObject({ donut_id: 2, tenant: "test-tenant" });
			await expect(page).toHaveURL("/donuts");
		});
	});
