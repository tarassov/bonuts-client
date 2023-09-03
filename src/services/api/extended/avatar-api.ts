import { bonutsApiOverride } from "services/api/injected-api";
import { PostAvatarsApiArg, PostAvatarsApiResponse } from "services/api/bonuts-api";
import { ApiMethod } from "services/api/helpers/api-method";

export const avatarApi = bonutsApiOverride.injectEndpoints({
	endpoints: (build) => ({
		updateAvatars: build.mutation<PostAvatarsApiResponse, PostAvatarsApiArg>({
			query(data) {
				return ApiMethod(`/avatars`, "POST", data);
			},
		}),
	}),
});
