import { emptySplitApi as api } from "./empty-api";
import { bonutsApi, PostAvatarsApiResponse } from "./bonuts-api";
export const bonutsApiOverride = bonutsApi.injectEndpoints({
	endpoints: (build) => ({
		updateAvatars: build.mutation<PostAvatarsApiResponse, FormData>({
			query(data) {
				return {
					url: "/avatars",
					method: "POST",
					credentials: "include",
					body: data,
				};
			},
		}),
	}),
});
export const { useUpdateAvatarsMutation } = bonutsApiOverride;
