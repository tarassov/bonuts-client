import type { GetReportsProfilesApiArg, GetReportsProfilesApiResponse } from "services/api/bonuts-api";
import { bonutsApi } from "services/api/bonuts-api";

import { ApiTags } from "@/shared/api";
import { getNextPageParam, getTransformPageableResponse } from "@/shared/lib/rtk";

import type { TPageable } from "@/types/api/api";

type TGetReportsProfilesInfiniteApiArg = GetReportsProfilesApiArg & {
	perPage?: number;
};

// noinspection TypeScriptValidateJSTypes
const reportsApiEnhanced = bonutsApi.enhanceEndpoints({
	addTagTypes: [ApiTags.Reports],
	endpoints: {
		getReportsProfiles: {
			providesTags: [ApiTags.Reports],
		},
	},
});

export const reportsApi = reportsApiEnhanced.injectEndpoints({
	endpoints: (build) => ({
		getReportsProfilesFeed: build.infiniteQuery<TPageable<GetReportsProfilesApiResponse>, TGetReportsProfilesInfiniteApiArg, number>({
			infiniteQueryOptions: {
				initialPageParam: 1,
				getNextPageParam,
			},
			query: ({ queryArg, pageParam }) => ({
				url: "/reports/profiles",
				params: {
					tenant: queryArg.tenant,
					report_type: queryArg.reportType,
					date_from: queryArg.dateFrom,
					date_to: queryArg.dateTo,
					search_text: queryArg.searchText,
					page: pageParam,
					per_page: queryArg.perPage,
				},
			}),
			transformResponse: getTransformPageableResponse<TPageable<GetReportsProfilesApiResponse>>(),
			providesTags: [ApiTags.Reports],
		}),
	}),
	overrideExisting: false,
});

export const { useGetReportsProfilesFeedInfiniteQuery } = reportsApi;
