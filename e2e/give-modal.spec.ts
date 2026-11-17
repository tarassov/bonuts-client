import { mockDashboard, mockGiveDonuts } from "./support/dashboard-page";
import { expect, test, viewports, visitAuthorized } from "./support/fixtures";

for (const viewport of viewports)
	test.describe(viewport.name, () => {
		test.use({ viewport });
		test("sends donuts with amount validation", async ({ page, api }) => {
			mockDashboard(api);
			mockGiveDonuts(api);
			await visitAuthorized(page, "/", { locale: "ru" });
			await page.getByTestId("event-feed-give-button").click();
			const dialog = page.getByRole("dialog");
			await expect(dialog).toContainText("Доставка пончиков");
			await dialog.getByText("Pepper Potts", { exact: true }).click();
			await expect(dialog).toContainText("Отправляем");
			await expect(dialog).toContainText("Pepper Potts");
			await expect(dialog.locator(".MuiAvatar-root")).toBeVisible();
			await expect(dialog).toContainText("Допустимая сумма: от 1 до 12");
			const amount = dialog.locator('input[name="amount"]');
			const submit = dialog.getByTestId("form-submit-button");
			await amount.fill("0");
			await expect(dialog).toContainText("Минимальное значение - 1");
			await expect(submit).toBeDisabled();
			await amount.fill("13");
			await expect(dialog).toContainText("Максимальное значение - 12");
			await expect(submit).toBeDisabled();
			await amount.fill("12");
			await dialog.locator('textarea[name="comment"]').fill("Thanks for keeping the team aligned.");
			await expect(submit).toBeEnabled();
			await submit.click();
			await expect(dialog).toContainText("Пончики уже в пути");
			await expect(dialog.getByRole("button", { name: "Закрыть", exact: true })).toBeVisible();
			expect(api.calls("POST", "/account_operations/transfer")).toHaveLength(1);
		});
	});
