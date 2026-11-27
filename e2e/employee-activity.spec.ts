import { expect, test, visitAuthorized } from "./support/fixtures";
import { PROFILE_RESPONSE } from "./support/fixtures/profile-response";

test("shows only the applicable employee activity action", async ({ page, api }) => {
	await page.setViewportSize({ width: 320, height: 850 });
	let active = true;
	const name = "Мария Волкова";
	api.mock("GET", "/profiles/199", () => ({
		body: { data: { ...PROFILE_RESPONSE.data, id: "199", attributes: { ...PROFILE_RESPONSE.data.attributes, id: 199, user_id: 199, name, active } } },
	}));
	api.mock("GET", "/profiles/199/profile_pictures", { body: { data: [] } });
	api.mock("POST", "/profiles/199/set_activity", (request) => {
		active = request.postDataJSON().active;
		return { body: { success: true } };
	});
	await visitAuthorized(page, "/e/199", { locale: "ru" });
	await expect(page.getByRole("heading", { name })).toBeVisible();
	const more = page.getByRole("button", { name: "Ещё", exact: true });
	const menu = page.getByRole("menu");
	const activate = menu.getByRole("menuitem", { name: "Активировать", exact: true });
	const disable = menu.getByRole("menuitem", { name: "Отключить аккаунт", exact: true });
	const dialog = page.getByRole("dialog");
	await more.click();
	await expect(activate).toHaveCount(0);
	await disable.click();
	await expect(dialog).toContainText(name);
	await expect(dialog).toContainText("Коллега потеряет доступ к Bonuts");
	await dialog.getByRole("button", { name: "Отмена", exact: true }).click();
	await expect(dialog).toBeHidden();
	expect(api.calls("POST", "/profiles/199/set_activity")).toHaveLength(0);
	await more.click();
	await disable.click();
	await dialog.getByRole("button", { name: "Деактивировать", exact: true }).click();
	await expect.poll(() => active).toBe(false);
	await more.click();
	await expect(disable).toHaveCount(0);
	await activate.click();
	await expect.poll(() => active).toBe(true);
	await more.click();
	await expect(disable).toBeVisible();
	await expect(activate).toHaveCount(0);
});
