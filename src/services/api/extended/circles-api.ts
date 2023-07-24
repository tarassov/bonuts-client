import { bonutsApi } from "services/api/bonuts-api";
import { invalidatesList, providesList } from "services/redux/utils/rtk-cache-utils";

// noinspection TypeScriptValidateJSTypes
export const circlesApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Circles"],
	endpoints: {
		postCircles: { invalidatesTags: invalidatesList("Circles") },
		getCircles: {
			providesTags: (result, error) => providesList("Circles")(result?.data, error),
		},
		patchCirclesById: { invalidatesTags: ["Circles"] },
		deleteCirclesById: { invalidatesTags: ["Circles"] },
	},
});
