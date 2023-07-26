import { bonutsApi } from "services/api/bonuts-api";
import {
	cacheByIdArgProperty,
	invalidatesList,
	providesList,
} from "services/redux/utils/rtk-cache-utils";

// noinspection TypeScriptValidateJSTypes
export const circlesApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Circles"],
	endpoints: {
		postCircles: { invalidatesTags: invalidatesList("Circles") },
		getCircles: { providesTags: providesList("Circles") },
		getCirclesById: {
			providesTags: cacheByIdArgProperty("Circles"),
		},
		patchCirclesById: { invalidatesTags: cacheByIdArgProperty("Circles") },
		deleteCirclesById: { invalidatesTags: ["Circles"] },
	},
});

export const { useGetCirclesByIdQuery } = circlesApi;
