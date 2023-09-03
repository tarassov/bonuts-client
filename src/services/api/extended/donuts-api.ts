import { bonutsApiOverride } from "../injected-api";

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
