import { bonutsApi } from "services/api/bonuts-api";

// noinspection TypeScriptValidateJSTypes
export const circlesApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Circles"],
	endpoints: {
		postCircles: { invalidatesTags: ["Circles"] },
		getCircles: {
			providesTags: ["Circles"],
		},
		patchCirclesById: { invalidatesTags: ["Circles"] },
	},
});
