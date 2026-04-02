import { bonutsApi } from "services/api/bonuts-api";
import { cacheByIdArgProperty, cacheByIdResultProperty, providesList } from "services/redux/utils/rtk-cache-utils";

export const profilesApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Profiles"],
	endpoints: {
		getProfiles: { providesTags: providesList("Profiles") },
		getProfile: { providesTags: cacheByIdResultProperty("Profiles", "CURRENT") },
		postProfilesByIdSetActivity: { invalidatesTags: cacheByIdArgProperty("Profiles") },
		putProfilesById: {
			invalidatesTags: (result, error, arg) => [...cacheByIdArgProperty("Profiles")(result, error, arg), { type: "Profiles", id: "CURRENT" }],
		},
		putUserLocale: { invalidatesTags: [{ type: "Profiles", id: "CURRENT" }] },
		getProfilesById: { providesTags: cacheByIdArgProperty("Profiles") },
		postUsersGenerateTg: { invalidatesTags: [{ type: "Profiles", id: "CURRENT" }] },
		postProfileNotificationsByIdActivate: { invalidatesTags: [{ type: "Profiles", id: "CURRENT" }] },
		postProfileNotificationsByIdDeactivate: { invalidatesTags: [{ type: "Profiles", id: "CURRENT" }] },
	},
});
