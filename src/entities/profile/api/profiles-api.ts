import { bonutsApi } from "services/api/bonuts-api";
import { cacheByIdArgProperty, cacheByIdResultProperty, providesList } from "services/redux/utils/rtk-cache-utils";

export const profilesApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Profiles"],
	endpoints: {
		getProfiles: { providesTags: providesList("Profiles") },
		getProfile: { providesTags: cacheByIdResultProperty("Profiles", "CURRENT") },
		postProfilesByIdSetActivity: { invalidatesTags: cacheByIdArgProperty("Profiles") },
		putProfilesById: { invalidatesTags: cacheByIdArgProperty("Profiles") },
		getProfilesById: { providesTags: cacheByIdArgProperty("Profiles") },
		postUsersGenerateTg: { invalidatesTags: [{ type: "Profiles", id: "CURRENT" }] },
		postProfileNotificationsByIdActivate: { invalidatesTags: [{ type: "Profiles", id: "CURRENT" }] },
		postProfileNotificationsByIdDeactivate: { invalidatesTags: [{ type: "Profiles", id: "CURRENT" }] },
	},
});
