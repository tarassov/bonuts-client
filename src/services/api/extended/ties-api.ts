import { bonutsApi } from "services/api/bonuts-api";

// noinspection TypeScriptValidateJSTypes
export const tiesApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Ties"],
	endpoints: {
		getTies: { providesTags: ["Ties"] },
	},
});

export const { useGetTiesQuery } = tiesApi;
