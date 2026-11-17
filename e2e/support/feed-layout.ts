import type { Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export async function expectCompactHeader(header: Locator): Promise<void> {
	await expect(header).toBeVisible();
	await expect
		.poll(() =>
			header.evaluate((element) => {
				const rect = element.getBoundingClientRect();
				return (
					rect.height <= 64 &&
					element.scrollWidth <= element.clientWidth &&
					[...element.querySelectorAll("button")].every((button) => {
						if (!button.getClientRects().length) return true;
						const bounds = button.getBoundingClientRect();
						return bounds.left >= rect.left - 1 && bounds.right <= rect.right + 1 && button.scrollWidth <= button.clientWidth;
					})
				);
			})
		)
		.toBe(true);
}

export async function openFeedSearch(header: Locator): Promise<void> {
	if (await header.evaluate((el) => el.getBoundingClientRect().width < 660)) {
		await header.getByRole("button", { name: "Поиск", exact: true }).click();
	} else {
		await header.locator("input").focus();
	}
	await expect(header.locator("input")).toBeFocused();
}
