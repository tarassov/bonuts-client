import { expect, test, viewports, visitAuthorized } from "./support/fixtures";
import { CIRCLES_RESPONSE, PROFILE_PICTURES_RESPONSE } from "./support/profile-page-data";

for (const viewport of viewports)
	test.describe(viewport.name, () => {
		test.use({ viewport });
		test.beforeEach(async ({ page, api }) => {
			let pictures = structuredClone(PROFILE_PICTURES_RESPONSE);
			api.mock("GET", "/circles", { body: CIRCLES_RESPONSE });
			api.mock("GET", "/profiles/1/profile_pictures", () => ({ body: pictures }));
			api.mock("DELETE", "/profile_pictures/11", () => {
				pictures = { data: pictures.data.filter((photo) => photo.id !== 11) };
				return { body: { success: true } };
			});
			await visitAuthorized(page, "/my");
			await expect(page.getByTestId("profile-header")).toBeVisible();
		});
		test("renders header, statuses and form sections", async ({ page }) => {
			const header = page.getByTestId("profile-header");
			await expect(header).toContainText(/tony stark/i);
			await expect(header).toContainText("Iron Man");
			await expect(header.getByRole("button", { name: "My photos", exact: true })).toBeVisible();
			await expect(page.getByTestId("photo-album-grid")).toHaveCount(0);
			await expect(page.getByTestId("profile-header-statuses").locator('[class*="MuiChip-root"]')).toHaveCount(2);
			for (const text of ["Main information", "Contacts", "Additional information", "Genius, billionaire, philanthropist."]) {
				const section = page.getByText(text, { exact: true });
				await section.scrollIntoViewIfNeeded();
				await expect(section).toBeVisible();
			}
			const roles = page.locator('[id="user-profile|roles"]').locator('xpath=ancestor::*[contains(@class,"MuiAutocomplete-root")][1]');
			await expect(roles).toContainText("Admin");
			await expect(roles).toContainText("Store admin");
			await expect(page.getByTestId("profile-locale-card")).toBeVisible();
			if (viewport.name === "desktop") {
				await expect
					.poll(() =>
						page
							.locator('[id="user-profile|circles"]')
							.locator('xpath=ancestor::*[contains(@class,"MuiAutocomplete-root")][1]')
							.evaluate((el) => el.getBoundingClientRect().width)
					)
					.toBeGreaterThan(200);
			}
		});
		test("opens album and allows deleting only own photos", async ({ page }) => {
			await page.getByRole("button", { name: "My photos", exact: true }).click();
			await expect(page).toHaveURL("/my/photos");
			const first = page.getByTestId("photo-album-tile-0");
			const second = page.getByTestId("photo-album-tile-1");
			await expect(second).toBeVisible();
			expect((await second.boundingBox())!.x).toBeGreaterThan((await first.boundingBox())!.x);
			await first.click();
			await expect(page.getByTestId("photo-album-viewer")).toBeVisible();
			await page.getByTestId("profile-photo-delete").click();
			await expect(page.getByTestId("photo-album-viewer")).toContainText("1 / 1");
			await expect(page.getByTestId("profile-photo-delete")).toHaveCount(0);
			await page.getByTestId("photo-album-close").click();
			await expect(page.locator('[data-testid^="photo-album-tile-"]')).toHaveCount(1);
		});
		if (viewport.name === "mobile")
			test("places locale above form and keeps save actions visible", async ({ page }) => {
				const top = async (id: string) => page.getByTestId(id).evaluate((el) => el.getBoundingClientRect().top);
				expect(await top("profile-locale-card")).toBeGreaterThan(await top("profile-header"));
				expect(await top("profile-locale-card")).toBeLessThan(await page.getByText("Main information", { exact: true }).evaluate((el) => el.getBoundingClientRect().top));
				await page.locator('[id="user-profile|first_name"]').fill("Anthony");
				await expect(page.getByTestId("profile-form-submit")).toBeVisible();
				await expect(page.getByTestId("profile-form-submit")).toHaveCSS("position", "sticky");
				await expect(page.getByTestId("form-cancel-button")).toBeVisible();
				await expect(page.getByTestId("form-submit-button")).toBeVisible();
			});
	});
