import { bonutsApi } from "services/api/bonuts-api";
import {
	cacheByIdArgProperty,
	invalidatesList,
	providesList,
} from "services/redux/utils/rtk-cache-utils";

// noinspection TypeScriptValidateJSTypes
export const schedulersApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Schedulers"],
	endpoints: {
		postDonutsSchedulers: { invalidatesTags: invalidatesList("Schedulers") },
		getDonutsSchedulers: { providesTags: providesList("Schedulers") },
		getDonutsSchedulersById: {
			providesTags: cacheByIdArgProperty("Schedulers"),
		},
		patchDonutsSchedulersById: { invalidatesTags: cacheByIdArgProperty("Schedulers") },
		deleteDonutsSchedulersById: { invalidatesTags: ["Schedulers"] },
	},
});

export const {
	useGetDonutsSchedulersByIdQuery,
	useGetDonutsSchedulersQuery,
	usePostDonutsSchedulersMutation,
	useDeleteDonutsSchedulersByIdMutation,
	usePatchDonutsSchedulersByIdMutation,
} = schedulersApi;