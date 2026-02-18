import { cacheByIdArgProperty } from "services/redux/utils/rtk-cache-utils";

import { bonutsApiOverride } from "../injected-api";

// noinspection TypeScriptValidateJSTypes
export const donutsApi = bonutsApiOverride.enhanceEndpoints({
	addTagTypes: ["Donuts"],
	endpoints: {
		getDonuts: { providesTags: ["Donuts"] },
		postDonuts: { invalidatesTags: ["Donuts"] },
		getDonutsById: { providesTags: cacheByIdArgProperty("Donuts") },
	},
});
