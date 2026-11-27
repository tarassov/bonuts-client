import { expect, test, visitAuthorized } from "./support/fixtures";
import { PROFILE_RESPONSE } from "./support/fixtures/profile-response";
import { PROFILE_PICTURES_RESPONSE } from "./support/profile-page-data";

test("contains every column of employee photos", async ({ page, api }) => {
	const { data } = PROFILE_RESPONSE;
	api.mock("GET", "/profiles/157", { body: { data: { ...data, id: "157", attributes: { ...data.attributes, id: 157 } } } });
	const url = "/assets/logo/bonuts_social_preview_1200x630.png";
	api.mock("GET", "/profiles/157/profile_pictures", {
		body: {
			data: Array.from({ length: 8 }, (_, index) => ({
				...PROFILE_PICTURES_RESPONSE.data[0],
				id: index + 1,
				image: { url, preview: { url }, thumb: { url } },
			})),
		},
	});
	await visitAuthorized(page, "/e/157");

	for (const width of [900, 1280, 320]) {
		await page.setViewportSize({ width, height: 850 });
		const grid = page.getByTestId("photo-album-grid");
		await expect(grid.getByRole("button")).toHaveCount(8);
		await expect
			.poll(() =>
				grid.evaluate((element) => {
					const card = element.closest(".scroll");
					const bounds = card?.getBoundingClientRect();
					if (!bounds) return false;
					return [...element.querySelectorAll("img")].every((image) => {
						const rect = image.getBoundingClientRect();
						const tile = image.parentElement?.getBoundingClientRect();
						return (
							image.complete &&
							image.naturalWidth > 0 &&
							tile &&
							rect.right <= Math.min(tile.right, bounds.right) + 1 &&
							rect.left >= Math.max(tile.left, bounds.left) - 1 &&
							Math.abs(rect.width / rect.height - image.naturalWidth / image.naturalHeight) < 0.02
						);
					});
				})
			)
			.toBe(true);
	}
});
