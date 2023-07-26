import { cacheByIdArgProperty, providesList } from "services/redux/utils/rtk-cache-utils";
import { bonutsApi } from "services/api/bonuts-api";

// noinspection TypeScriptValidateJSTypes
export const profilesApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Profiles"],
	endpoints: {
		getProfiles: {
			providesTags: providesList("Profiles"),
		},
		postProfilesByIdSetActivity: { invalidatesTags: cacheByIdArgProperty("Profiles") },
		putProfilesById: { invalidatesTags: cacheByIdArgProperty("Profiles") },
		getProfilesById: { providesTags: cacheByIdArgProperty("Profiles") },
	},
});
