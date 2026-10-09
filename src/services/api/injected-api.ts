import type { PostDonutsApiResponse, PutDonutsByIdApiArg, PutDonutsByIdApiResponse } from "./bonuts-api";
import { bonutsApi } from "./bonuts-api";
import { ApiMethod } from "@/services/api/helpers/api-method";

export const bonutsApiOverride = bonutsApi.injectEndpoints({
	endpoints: (build) => ({
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
export const { useCreateDonutMutation, useUpdateDonutMutation } = bonutsApiOverride;
