import type { TPicture } from "./picture";

export type TProfilePhotoSource = {
	photos?: Array<TPicture> | null;
	user_photos?: Array<TPicture> | null;
	profile_photos?: Array<TPicture> | null;
};

export function getProfilePhotos(source?: TProfilePhotoSource | null): Array<TPicture> {
	if (!source) {
		return [];
	}

	return source.photos || source.user_photos || source.profile_photos || [];
}
