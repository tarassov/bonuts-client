import { bonutsApi } from "services/api/bonuts-api";

import { ApiTags } from "@/shared/api";
import { cacheByArgProperty, cacheByIdArgProperty, getTransformPageableResponse, invalidatesList, providesListTag } from "@/shared/lib/rtk";

import type { GetAccountOperationsApiResponse, GetAccountOperationsHistoryApiResponse } from "@/services/api/bonuts-api";

// noinspection TypeScriptValidateJSTypes
export const accountsApi = bonutsApi.enhanceEndpoints({
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

export const { useGetAccountsByIdQuery } = accountsApi;
