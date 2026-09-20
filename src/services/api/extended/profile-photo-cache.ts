import type { TPicture } from "@/types/model/picture";

type TOptimisticProfilePhoto = TPicture & { id: number };

let nextOptimisticPhotoId = 0;

export function createOptimisticProfilePhoto(url: string): TOptimisticProfilePhoto {
	return { id: --nextOptimisticPhotoId, url };
}

export function prependProfilePhoto(photos: Array<TPicture>, photo: TPicture) {
	photos.unshift(photo);
}

export function replaceProfilePhoto(photos: Array<TPicture>, optimisticPhotoId: number, photo: TPicture) {
	const optimisticPhotoIndex = photos.findIndex(({ id }) => id === optimisticPhotoId);

	if (optimisticPhotoIndex === -1) {
		photos.unshift(photo);
		return;
	}

	photos[optimisticPhotoIndex] = photo;
}

export function removeProfilePhoto(photos: Array<TPicture>, photoId: number) {
	const photoIndex = photos.findIndex(({ id }) => id === photoId);

	if (photoIndex !== -1) {
		photos.splice(photoIndex, 1);
	}
}
