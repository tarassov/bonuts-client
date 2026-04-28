import { bonutsApi } from "services/api/bonuts-api";

import { ApiTags } from "@/shared/api";
import { cacheByIdArgProperty, getTransformPageableResponse } from "@/shared/lib/rtk";

import type { GetAccountOperationsApiResponse } from "@/services/api/bonuts-api";

// noinspection TypeScriptValidateJSTypes
export const accountsApi = bonutsApi.enhanceEndpoints({
	addTagTypes: [ApiTags.Accounts, ApiTags.History],
	endpoints: {
		getAccountsById: {
			providesTags: cacheByIdArgProperty(ApiTags.Accounts, ApiTags.Balance),
		},
		postAccountOperations: { invalidatesTags: [ApiTags.Accounts] },
		postAccountOperationsTransfer: { invalidatesTags: [ApiTags.Accounts] },
		postAccountOperationsShareAll: { invalidatesTags: [ApiTags.Accounts] },
		getAccountOperations(endpoint) {
			endpoint.providesTags = (result, error, arg) => {
				return [{ type: ApiTags.Accounts, id: arg.accountId }];
			};
			endpoint.transformResponse = getTransformPageableResponse<GetAccountOperationsApiResponse>();
		},
	},
});

export const { useGetAccountsByIdQuery } = accountsApi;
