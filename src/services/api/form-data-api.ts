import { bonutsApi, PostAvatarsApiResponse, PostDonutsApiResponse } from "./bonuts-api";

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
		createDonut: build.mutation<PostDonutsApiResponse, FormData>({
			query(data) {
				return {
					url: "/donuts",
					method: "POST",
					credentials: "include",
					body: data,
				};
			},
		}),
		putDonutsById: build.mutation<PostDonutsApiResponse, { id: number; body: FormData }>({
			query(data) {
				return {
					url: `/donuts/${data.id}`,
					method: "POST",
					credentials: "include",
					body: data.body,
				};
			},
		}),
	}),
});
export const { useUpdateAvatarsMutation, useCreateDonutMutation, usePutDonutsByIdMutation } =
	bonutsApiOverride;
