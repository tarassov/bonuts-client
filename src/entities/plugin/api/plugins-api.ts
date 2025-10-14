import { bonutsApi } from "services/api/bonuts-api";
import { invalidatesList, providesList } from "services/redux/utils/rtk-cache-utils";

// noinspection TypeScriptValidateJSTypes
export const pluginsApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Plugins", "Notifications"],
	endpoints: {
		getPlugins: { providesTags: providesList("Plugins") },
		getProfileNotifications: { providesTags: [{ type: "Notifications", id: "LIST" }] },
		postPluginsByIdActivate: { invalidatesTags: invalidatesList(["Plugins", "Notifications"]) },
		postPluginsByIdDeactivate: { invalidatesTags: invalidatesList(["Plugins", "Notifications"]) },
		patchPluginsById: { invalidatesTags: invalidatesList("Plugins") },
	},
});

export const {
	useGetPluginsQuery,
	usePatchPluginsByIdMutation,
	usePostPluginsByIdActivateMutation,
	usePostPluginsByIdDeactivateMutation,
} = pluginsApi;
