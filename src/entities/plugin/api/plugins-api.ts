import { bonutsApi } from "services/api/bonuts-api";
import { invalidatesList, providesList } from "services/redux/utils/rtk-cache-utils";

// noinspection TypeScriptValidateJSTypes
export const pluginsApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Plugins"],
	endpoints: {
		getPlugins: { providesTags: providesList("Plugins") },
		postPluginsByIdActivate: { invalidatesTags: invalidatesList("Plugins") },
		postPluginsByIdDeactivate: { invalidatesTags: invalidatesList("Plugins") },
		patchPluginsById: { invalidatesTags: invalidatesList("Plugins") },
	},
});

export const {
	useGetPluginsQuery,
	usePatchPluginsByIdMutation,
	usePostPluginsByIdActivateMutation,
	usePostPluginsByIdDeactivateMutation,
} = pluginsApi;
