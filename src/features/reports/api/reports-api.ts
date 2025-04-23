import { bonutsApi } from "services/api/bonuts-api";
// noinspection TypeScriptValidateJSTypes
export const reportsApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Reports"],
	endpoints: {
		getReportsProfiles: {
			providesTags: ["Reports"],
		},
	},
});
