import { ApiMethod } from "services/api/helpers/api-method";
import {
	bonutsApi,
	PostAvatarsApiResponse,
	PostDonutsApiResponse,
	PutDonutsByIdApiArg,
	PutDonutsByIdApiResponse,
} from "./bonuts-api";

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
		updateDonut: build.mutation<PutDonutsByIdApiResponse, PutDonutsByIdApiArg>({
			query(data) {
				return ApiMethod(`/donuts/${data.id}`, "PUT", data);
			},
		}),
	}),
});
export const { useUpdateAvatarsMutation, useCreateDonutMutation, useUpdateDonutMutation } =
	bonutsApiOverride;
