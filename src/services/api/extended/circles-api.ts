import { bonutsApiOverride } from "services/api/form-data-api";

export const circlesApi = bonutsApiOverride.enhanceEndpoints({
	addTagTypes: ["Circles"],
	endpoints: {
		postCircles: { invalidatesTags: ["Circles"] },
		getCircles: {
			providesTags: ["Circles"],
		},
	},
});
