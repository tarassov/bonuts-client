import { expect, test, visitAuthorized } from "./support/fixtures";
import { PROFILE_PICTURES_RESPONSE } from "./support/profile-page-data";

const preview = "/assets/logo/bonuts_icon_256.png";
const original = "/assets/logo/bonuts_icon_512.png";
const photo = { ...PROFILE_PICTURES_RESPONSE.data[0], image: { url: original, thumb: { url: preview }, preview: { url: preview } } };

test("shows the gallery preview while the original loads", async ({ page, api }) => {
	api.mock("GET", "/profiles/1/profile_pictures", { body: { data: [photo] } });
	let releaseOriginal!: () => void;
	const pending = new Promise<void>((resolve) => {
		releaseOriginal = resolve;
	});
	await page.route(`**${original}`, async (route) => {
		await pending;
		await route.continue();
	});

	try {
		await visitAuthorized(page, "/my/photos");
		await page.getByTestId("photo-album-tile-0").click();
		const image = page.getByTestId("photo-album-viewer").getByRole("img", { name: /photos 1/i });
		await expect(image).toHaveAttribute("src", preview);
		await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
		releaseOriginal();
		await expect(image).toHaveAttribute("src", original);
	} finally {
		releaseOriginal();
	}
});

test("marks an upload as pending and retries the same file after failure", async ({ page, api }) => {
	api.mock("GET", "/profiles/1/profile_pictures", { body: { data: [] } });
	let releaseUpload!: () => void;
	const pending = new Promise<void>((resolve) => {
		releaseUpload = resolve;
	});
	let attempts = 0;
	api.mock("POST", "/profiles/1/profile_pictures", async () => {
		attempts++;
		if (attempts === 1) {
			await pending;
			return { status: 422, body: { message: "Upload failed" } };
		}
		return { body: { data: photo } };
	});

	try {
		await visitAuthorized(page, "/my/photos");
		await expect(page.getByRole("button", { name: "Add photo" })).toBeEnabled();
		await page.locator('input[type="file"]').setInputFiles("public/assets/logo/bonuts_icon_256.png");
		await expect(page.getByText("Uploading photo", { exact: true })).toBeVisible();
		releaseUpload();
		await expect(page.getByText("Could not upload bonuts_icon_256.png", { exact: true })).toBeVisible();
		await page.getByRole("button", { name: "Try again", exact: true }).click();
		await expect(page.getByTestId("photo-album-tile-0")).toBeVisible();
		await expect(page.getByText("Uploading photo", { exact: true })).toHaveCount(0);
		expect(attempts).toBe(2);
	} finally {
		releaseUpload();
	}
});

test("reserves space for slow gallery photos while faster photos appear", async ({ page, api }) => {
	await page.setViewportSize({ width: 375, height: 850 });
	const fastPhoto = { ...photo, id: photo.id + 1, image: { ...photo.image, preview: { url: original } } };
	api.mock("GET", "/profiles/1/profile_pictures", { body: { data: [photo, fastPhoto] } });
	let releasePreview!: () => void;
	const pending = new Promise<void>((resolve) => {
		releasePreview = resolve;
	});
	await page.route(`**${preview}`, async (route) => {
		await pending;
		await route.continue();
	});

	try {
		await visitAuthorized(page, "/my/photos");
		const firstTile = page.getByTestId("photo-album-tile-0");
		const firstImage = firstTile.locator("img");
		const secondImage = page.getByTestId("photo-album-tile-1").locator("img");
		await expect(firstImage).toHaveCSS("opacity", "0");
		await expect.poll(() => firstTile.evaluate((tile) => tile.getBoundingClientRect().height)).toBeGreaterThan(100);
		await expect(secondImage).toHaveCSS("opacity", "1");
		await expect(firstImage).toHaveCSS("opacity", "0");
		releasePreview();
		await expect(firstImage).toHaveCSS("opacity", "1");
	} finally {
		releasePreview();
	}
});
