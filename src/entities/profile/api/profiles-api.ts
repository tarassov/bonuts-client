import { bonutsApi } from "services/api/bonuts-api";

import { cacheByIdArgProperty, cacheByIdResultProperty, getNextPageParam, getTransformPageableResponse, providesInfiniteList, providesList } from "@/shared/lib/rtk";

import type { GetProfilesApiArg, GetProfilesApiResponse } from "@/services/api/bonuts-api";
import type { TPageable } from "@/types/api/api";

const profilesApiEnhanced = bonutsApi.enhanceEndpoints({
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

export const profilesApi = profilesApiEnhanced.injectEndpoints({
	endpoints: (build) => ({
		getProfilesFeed: build.infiniteQuery<TPageable<GetProfilesApiResponse>, Omit<GetProfilesApiArg, "page">, number>({
			infiniteQueryOptions: {
				initialPageParam: 1,
				getNextPageParam,
			},
			query: ({ queryArg, pageParam }) => ({
				url: "/profiles",
				params: {
					tenant: queryArg.tenant,
					search_text: queryArg.searchText,
					sort: queryArg.sort,
					page: pageParam,
					per_page: queryArg.perPage,
				},
			}),
			transformResponse: getTransformPageableResponse<TPageable<GetProfilesApiResponse>>(),
			providesTags: providesInfiniteList("Profiles"),
		}),
	}),
	overrideExisting: false,
});

export const { useGetProfilesFeedInfiniteQuery } = profilesApi;
