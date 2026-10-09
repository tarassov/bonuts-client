import { describe, expect, it } from "vitest";

import { createOptimisticProfilePhoto, prependProfilePhoto, removeProfilePhoto, replaceProfilePhoto } from "./profile-photo-cache";

describe("profile photo cache", () => {
	it("places each optimistic photo at the beginning with a unique temporary id", () => {
		const photos = [{ id: 10, url: "persisted.jpg" }];
		const firstUpload = createOptimisticProfilePhoto("first-preview");
		const secondUpload = createOptimisticProfilePhoto("second-preview");

		prependProfilePhoto(photos, firstUpload);
		prependProfilePhoto(photos, secondUpload);

		expect(photos).toEqual([secondUpload, firstUpload, { id: 10, url: "persisted.jpg" }]);
		expect(firstUpload.id).not.toBe(secondUpload.id);
		expect(firstUpload.id).toBeLessThan(0);
		expect(secondUpload.id).toBeLessThan(0);
	});

	it("replaces only the completed optimistic upload", () => {
		const firstUpload = createOptimisticProfilePhoto("first-preview");
		const secondUpload = createOptimisticProfilePhoto("second-preview");
		const photos = [secondUpload, firstUpload];
		const persistedPhoto = { id: 20, url: "persisted-first.jpg" };

		replaceProfilePhoto(photos, firstUpload.id, persistedPhoto);

		expect(photos).toEqual([secondUpload, persistedPhoto]);
	});

	it("removes only the failed optimistic upload", () => {
		const firstUpload = createOptimisticProfilePhoto("first-preview");
		const secondUpload = createOptimisticProfilePhoto("second-preview");
		const photos = [secondUpload, firstUpload, { id: 10, url: "persisted.jpg" }];

		removeProfilePhoto(photos, firstUpload.id);

		expect(photos).toEqual([secondUpload, { id: 10, url: "persisted.jpg" }]);
	});
});
