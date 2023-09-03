import { ApiMethod } from "services/api/helpers/api-method";
import {
	bonutsApi,
	PostDonutsApiResponse,
	PutDonutsByIdApiArg,
	PutDonutsByIdApiResponse,
} from "./bonuts-api";

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
