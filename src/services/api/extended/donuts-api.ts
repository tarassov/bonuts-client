import { bonutsApiOverride } from "../form-data-api";

// noinspection TypeScriptValidateJSTypes
export const donutsApi = bonutsApiOverride.enhanceEndpoints({
	addTagTypes: ["Donuts"],
	endpoints: {
		getDonuts: {
			providesTags: ["Donuts"],
		},
		postDonuts: {
			invalidatesTags: ["Donuts"],
		},
	},
});
