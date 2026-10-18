import { ApiTags } from "@/shared/api";

import { createOptimisticProfilePhoto, prependProfilePhoto, removeProfilePhoto, replaceProfilePhoto } from "./profile-photo-cache";
import type {
	DeleteProfilePicturesByIdApiArg,
	DeleteProfilePicturesByIdApiResponse,
	GetProfilesByProfileIdProfilePicturesApiArg,
	GetProfilesByProfileIdProfilePicturesApiResponse,
	PostProfilesByProfileIdProfilePicturesApiArg,
	PostProfilesByProfileIdProfilePicturesApiResponse,
} from "@/services/api/bonuts-api";
import { ApiMethod } from "@/services/api/helpers/api-method";
import { bonutsApiOverride } from "@/services/api/injected-api";
import type { TPicture } from "@/types/model/picture";

type TAddProfilePhotoApiArg = PostProfilesByProfileIdProfilePicturesApiArg & {
	optimisticPreviewUrl: string;
};

function adaptProfilePicture(photo: PostProfilesByProfileIdProfilePicturesApiResponse["data"]): TPicture {
	return {
		id: photo.id,
		user_id: photo.user_id,
		...photo.image,
	};
}

function adaptProfilePictures(response: GetProfilesByProfileIdProfilePicturesApiResponse): Array<TPicture> {
	return response.data.map(adaptProfilePicture);
}

async function preloadProfilePhoto(photo: TPicture) {
	const url = photo.preview?.url || photo.url || photo.thumb?.url;

	if (!url) {
		return;
	}

	const image = new Image();
	image.src = url;

	try {
		await image.decode();
	} catch {
		// The browser will retry loading the image when it is rendered.
	}
}

export const photosApi = bonutsApiOverride
	.enhanceEndpoints({
		addTagTypes: [ApiTags.ProfilePhotos],
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getProfilePhotos: build.query<Array<TPicture>, GetProfilesByProfileIdProfilePicturesApiArg>({
				query: ({ profileId, tenant }) => ({
					url: `/profiles/${profileId}/profile_pictures`,
					params: { tenant },
				}),
				transformResponse: (response: GetProfilesByProfileIdProfilePicturesApiResponse) => adaptProfilePictures(response),
				providesTags: (result, error, arg) => [{ type: ApiTags.ProfilePhotos, id: arg.profileId }],
			}),
			addProfilePhoto: build.mutation<TPicture, TAddProfilePhotoApiArg>({
				query(data) {
					return ApiMethod(`/profiles/${data.profileId}/profile_pictures`, "POST", {
						profileId: data.profileId,
						body: data.body,
					});
				},
				transformResponse: (response: PostProfilesByProfileIdProfilePicturesApiResponse) => adaptProfilePicture(response.data),
				async onQueryStarted(arg, { dispatch, queryFulfilled }) {
					const queryArgs = { profileId: arg.profileId, tenant: arg.body.tenant };
					const optimisticPhoto = createOptimisticProfilePhoto(arg.optimisticPreviewUrl);

					dispatch(
						photosApi.util.updateQueryData("getProfilePhotos", queryArgs, (draft) => {
							prependProfilePhoto(draft, optimisticPhoto);
						})
					);

					try {
						const { data: photo } = await queryFulfilled;
						await preloadProfilePhoto(photo);

						dispatch(
							photosApi.util.updateQueryData("getProfilePhotos", queryArgs, (draft) => {
								replaceProfilePhoto(draft, optimisticPhoto.id, photo);
							})
						);
					} catch {
						dispatch(
							photosApi.util.updateQueryData("getProfilePhotos", queryArgs, (draft) => {
								removeProfilePhoto(draft, optimisticPhoto.id);
							})
						);
					} finally {
						URL.revokeObjectURL(arg.optimisticPreviewUrl);
					}
				},
			}),
			deleteProfilePhoto: build.mutation<DeleteProfilePicturesByIdApiResponse, DeleteProfilePicturesByIdApiArg>({
				query: ({ id, tenant }) => ({
					url: `/profile_pictures/${id}`,
					method: "DELETE",
					params: { tenant },
				}),
				invalidatesTags: [ApiTags.ProfilePhotos],
			}),
		}),
	});
