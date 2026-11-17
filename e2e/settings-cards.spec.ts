import { expect, test, viewports, visitAuthorized } from "./support/fixtures";
import { TENANT_RESPONSE } from "./support/fixtures/tenant-response";
import { CIRCLES_RESPONSE } from "./support/settings-cards-data";

for (const viewport of viewports)
	test.describe(viewport.name, () => {
		test.use({ viewport });
		test.beforeEach(({ api }) => {
			api.mock("GET", "/circles", { body: CIRCLES_RESPONSE });
		});
		test("shows circles as searchable list with accessible actions", async ({ page }) => {
			await visitAuthorized(page, "/circles");
			await expect(page.getByRole("heading", { level: 1, name: "Team circles" })).toBeVisible();
			await expect(page.getByText("Circles help show which projects and areas each team member contributes to.")).toBeVisible();
			await expect(page.getByTestId("circle-list-item")).toHaveCount(3);
			await page.locator('input[name="circle-search"]').fill("engineering");
			await expect(page.getByTestId("circle-list-item")).toHaveCount(1);
			await expect(page.getByTestId("circle-list-item")).toContainText("Engineering");
			await page.getByRole("button", { name: "Circle actions", exact: true }).click();
			await expect(page.getByRole("menuitem", { name: "Rename circle" })).toBeVisible();
			await expect(page.getByRole("menuitem", { name: "Delete circle" })).toBeVisible();
		});
		test("groups team settings by member outcome", async ({ page }) => {
			await visitAuthorized(page, "/tenant");
			await expect(page.getByRole("heading", { level: 1, name: "Team settings" })).toBeVisible();
			await expect(page.locator('input[name="caption"]')).toHaveValue("Avengers");
			for (const name of ["Team identity", "Welcoming new members", "Birthday"]) {
				const heading = page.getByRole("heading", { level: 2, name, exact: true });
				await heading.scrollIntoViewIfNeeded();
				await expect(heading).toBeVisible();
			}
			await expect(page.getByTestId("form-submit-button")).toBeVisible();
		});
		test("prevents saving while team logo uploads", async ({ page, api }) => {
			let release!: () => void;
			const pending = new Promise<void>((resolve) => {
				release = resolve;
			});
			api.mock("PUT", "/tenant/current", async () => {
				await pending;
				return { body: TENANT_RESPONSE };
			});
			try {
				await visitAuthorized(page, "/tenant");
				await page.locator('input[type="file"]').setInputFiles({ name: "team-logo.png", mimeType: "image/png", buffer: Buffer.from("team logo") });
				await expect(page.getByTestId("form-submit-button")).toBeDisabled();
				release();
				await expect(page.getByTestId("form-submit-button")).toBeEnabled();
			} finally {
				release();
			}
		});
		test("restores persisted logo when upload fails", async ({ page, api }) => {
			let release!: () => void;
			const pending = new Promise<void>((resolve) => {
				release = resolve;
			});
			api.mock("PUT", "/tenant/current", async () => {
				await pending;
				return { body: { error: "Invalid image" }, status: 422 };
			});
			try {
				await visitAuthorized(page, "/tenant");
				await page.locator('input[type="file"]').setInputFiles({ name: "invalid-team-logo.png", mimeType: "image/png", buffer: Buffer.from("invalid logo") });
				await expect(page.getByRole("button", { name: "Change logo", exact: true }).locator("img")).toHaveAttribute("src", /^blob:/);
				release();
				await expect(page.getByRole("button", { name: "Change logo", exact: true }).locator("img")).toHaveCount(0);
				await expect(page.getByRole("button", { name: "Change logo", exact: true })).toContainText("A");
			} finally {
				release();
			}
		});
	});
