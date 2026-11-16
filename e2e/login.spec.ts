import { mockDashboard } from "./support/dashboard-page";
import { expect, test } from "./support/fixtures";

test("renders login form fields and submit button", async ({ page }) => {
	await page.goto("/login");
	await expect(page).toHaveURL(/\/login$/);
	for (const selector of ["#email", "#password", '[data-testid="login-language-selector"]', 'button[type="submit"]']) {
		await expect(page.locator(selector)).toBeVisible();
	}
});

test("changes language without updating the profile", async ({ page, api }) => {
	await page.goto("/login");
	await page.getByTestId("login-language-selector").click();
	await page.getByRole("option", { name: "English", exact: true }).click();
	await expect(page.getByText("Sign in", { exact: true }).first()).toBeVisible();
	expect(api.calls("PUT", "/profile")).toHaveLength(0);
});

test("redirects to dashboard after successful login", async ({ page, api }) => {
	mockDashboard(api);
	api.mock("POST", "/authenticate", { body: { auth_token: "test-auth-token", currentTenant: "test-tenant", tenants: [{ name: "test-tenant" }] } });
	await page.goto("/login");
	await page.locator("#email").fill("test@example.com");
	await page.locator("#password").fill("password123");
	await page.locator('button[type="submit"]').click();
	await expect(page).toHaveURL("/");
	await expect(page.getByTestId("event-feed-header")).toBeVisible();
	expect(api.calls("POST", "/authenticate")).toHaveLength(1);
});
