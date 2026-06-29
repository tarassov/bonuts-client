import { ApiTags } from "@/shared/api";

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

function adaptProfilePictures(response: GetProfilesByProfileIdProfilePicturesApiResponse): Array<TPicture> {
	return response.data.map((item) => ({
		id: item.id,
		user_id: item.user_id,
		...item.image,
	}));
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
			addProfilePhoto: build.mutation<PostProfilesByProfileIdProfilePicturesApiResponse, PostProfilesByProfileIdProfilePicturesApiArg>({
				query(data) {
					return ApiMethod(`/profiles/${data.profileId}/profile_pictures`, "POST", data);
				},
				invalidatesTags: (result, error, arg) => [{ type: ApiTags.ProfilePhotos, id: arg.profileId }],
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
