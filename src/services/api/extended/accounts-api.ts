import { bonutsApi } from "services/api/bonuts-api";

import { ApiTags } from "@/shared/api";
import { cacheByArgProperty, cacheByIdArgProperty, getNextPageParam, getTransformPageableResponse, invalidatesList, providesListTag } from "@/shared/lib/rtk";

import type { GetAccountOperationsApiArg, GetAccountOperationsApiResponse, GetAccountOperationsHistoryApiArg, GetAccountOperationsHistoryApiResponse } from "@/services/api/bonuts-api";
import type { TPageable } from "@/types/api/api";

// noinspection TypeScriptValidateJSTypes
const accountsApiEnhanced = bonutsApi.enhanceEndpoints({
	addTagTypes: [ApiTags.Accounts, ApiTags.History, "Event"],
	endpoints: {
		getAccountsById: {
			providesTags: cacheByIdArgProperty(ApiTags.Accounts, ApiTags.Balance),
		},
		postAccountOperations: { invalidatesTags: invalidatesList([ApiTags.Accounts, ApiTags.History]) },
		postAccountOperationsTransfer: { invalidatesTags: invalidatesList(["Event", ApiTags.History]) },
		postAccountOperationsShareAll: { invalidatesTags: invalidatesList([ApiTags.Accounts, ApiTags.History]) },
		getAccountOperations(endpoint) {
			endpoint.providesTags = cacheByArgProperty(ApiTags.Accounts, "accountId");
			endpoint.transformResponse = getTransformPageableResponse<GetAccountOperationsApiResponse>();
		},
		getAccountOperationsHistory(endpoint) {
			endpoint.providesTags = providesListTag(ApiTags.History);
			endpoint.transformResponse = getTransformPageableResponse<GetAccountOperationsHistoryApiResponse>();
		},
	},
});

export const accountsApi = accountsApiEnhanced.injectEndpoints({
	endpoints: (build) => ({
		getAccountOperationsFeed: build.infiniteQuery<TPageable<GetAccountOperationsApiResponse>, Omit<GetAccountOperationsApiArg, "page">, number>({
			infiniteQueryOptions: {
				initialPageParam: 1,
				getNextPageParam,
			},
			query: ({ queryArg, pageParam }) => ({
				url: "/account_operations",
				params: {
					tenant: queryArg.tenant,
					account_id: queryArg.accountId,
					page: pageParam,
				},
			}),
			transformResponse: getTransformPageableResponse<TPageable<GetAccountOperationsApiResponse>>(),
			providesTags: cacheByArgProperty(ApiTags.Accounts, "accountId"),
		}),
		getAccountOperationsHistoryFeed: build.infiniteQuery<TPageable<GetAccountOperationsHistoryApiResponse>, Omit<GetAccountOperationsHistoryApiArg, "page">, number>({
			infiniteQueryOptions: {
				initialPageParam: 1,
				getNextPageParam,
			},
			query: ({ queryArg, pageParam }) => ({
				url: "/account_operations/history",
				params: {
					tenant: queryArg.tenant,
					profile_id: queryArg.profileId,
					account_type: queryArg.accountType,
					operation_type: queryArg.operationType,
					search: queryArg.search,
					date_from: queryArg.dateFrom,
					date_to: queryArg.dateTo,
					page: pageParam,
					per_page: queryArg.perPage,
				},
			}),
			transformResponse: getTransformPageableResponse<TPageable<GetAccountOperationsHistoryApiResponse>>(),
			providesTags: providesListTag(ApiTags.History),
		}),
	}),
	overrideExisting: false,
});

export const { useGetAccountsByIdQuery, useGetAccountOperationsFeedInfiniteQuery, useGetAccountOperationsHistoryFeedInfiniteQuery } = accountsApi;
