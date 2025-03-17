import { bonutsApi } from "services/api/bonuts-api";
import { providesList } from "services/redux/utils/rtk-cache-utils";

// noinspection TypeScriptValidateJSTypes
export const pluginsApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Plugins"],
	endpoints: {
		getPlugins: { providesTags: providesList("Plugins") },
	},
});

export const { useGetPluginsQuery } = pluginsApi;
