import { mockDashboard } from "./support/dashboard-page";
import { expectCompactHeader, openFeedSearch } from "./support/feed-layout";
import { expect, test, visitAuthorized } from "./support/fixtures";

test("adapts header to feed width with navigation drawer open", async ({ page, api }) => {
	await page.setViewportSize({ width: 900, height: 720 });
	mockDashboard(api);
	await visitAuthorized(page, "/", { locale: "ru" });
	await page.locator(".MuiDrawer-paper button").first().click();
	await expect(page.locator(".MuiDrawer-paper")).toHaveCSS("width", "240px");
	const header = page.getByTestId("event-feed-header");
	for (const width of [900, 1100, 1600]) {
		await page.setViewportSize({ width, height: 720 });
		await expectCompactHeader(header);
		expect(await header.evaluate((el) => el.getBoundingClientRect().right <= el.closest('[data-testid="dashboard-event-feed"]')!.getBoundingClientRect().right + 1)).toBe(true);
		await expect(header.getByTestId("event-feed-give-button")).toHaveText(width < 1600 ? "Подарить" : "Подарить пончики", { useInnerText: true });
		await openFeedSearch(header);
		const all = header.getByRole("button", { name: "Все записи", exact: true });
		if (width < 1600) await expect(all).toBeHidden();
		else await expect(all).toBeVisible();
		await expectCompactHeader(header);
		await header.getByRole("button", { name: "Закрыть поиск", exact: true }).click();
		if (await header.evaluate((el) => el.getBoundingClientRect().width >= 660)) await expect(header.locator("input")).toBeVisible();
		else await expect(header.locator("input")).toBeHidden();
		await expect(all).toBeVisible();
	}
	await header.locator("input").fill("Спасибо");
	await page.setViewportSize({ width: 900, height: 720 });
	await expect(header.locator("input")).toBeVisible();
	await expect(header.locator("input")).toHaveValue("Спасибо");
	await header.locator("input").press("Escape");
	await expect(header.getByRole("button", { name: "Все записи", exact: true })).toBeVisible();
});
