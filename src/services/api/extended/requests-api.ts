import { getNextPageParam, getTransformPageableResponse } from "@/shared/lib/rtk";

import type { GetRequestsApiArg, GetRequestsApiResponse } from "@/services/api/bonuts-api";
import { bonutsApi } from "@/services/api/bonuts-api";
import type { TPageable } from "@/types/api/api";

const requestsTag = "Request";

const requestsApiEnhanced = bonutsApi.enhanceEndpoints({
	addTagTypes: [requestsTag],
	endpoints: {
		getRequests: {
			providesTags: [requestsTag],
		},
		getRequestsMetrics: {
			providesTags: [requestsTag],
		},
		postRequests: {
			invalidatesTags: [requestsTag],
		},
		postRequestsActivate: {
			invalidatesTags: [requestsTag],
		},
		postRequestsRefund: {
			invalidatesTags: [requestsTag],
		},
		postRequestsRollback: {
			invalidatesTags: [requestsTag],
		},
		postRequestsClose: {
			invalidatesTags: [requestsTag],
		},
	},
});

export const requestsApi = requestsApiEnhanced.injectEndpoints({
	endpoints: (build) => ({
		getRequestsFeed: build.infiniteQuery<TPageable<GetRequestsApiResponse>, Omit<GetRequestsApiArg, "page">, number>({
			infiniteQueryOptions: {
				initialPageParam: 1,
				getNextPageParam,
			},
			query: ({ queryArg, pageParam }) => ({
				url: "/requests",
				params: {
					active: queryArg.active,
					archive: queryArg.archive,
					incoming: queryArg.incoming,
					my: queryArg.my,
					tenant: queryArg.tenant,
					page: pageParam,
					per_page: queryArg.perPage,
					search: queryArg.search,
				},
			}),
			transformResponse: getTransformPageableResponse<TPageable<GetRequestsApiResponse>>(),
			providesTags: [requestsTag],
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetRequestsQuery,
	useGetRequestsMetricsQuery,
	useGetRequestsFeedInfiniteQuery,
	usePostRequestsMutation,
	usePostRequestsActivateMutation,
	usePostRequestsRefundMutation,
	usePostRequestsRollbackMutation,
	usePostRequestsCloseMutation,
} = requestsApi;
