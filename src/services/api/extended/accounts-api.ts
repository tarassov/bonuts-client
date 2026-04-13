import { bonutsApi } from "services/api/bonuts-api";
import { getPaginator } from "services/api/helpers/get-paginator";
import { cacheByIdArgProperty } from "services/redux/utils/rtk-cache-utils";

import type { GetAccountOperationsApiResponse } from "@/services/api/bonuts-api";
import type { TPageable } from "@/types/api/api";

// noinspection TypeScriptValidateJSTypes
export const accountsApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Accounts", "History"],
	endpoints: {
		getAccountsById: {
			providesTags: cacheByIdArgProperty("Accounts", "Balance"),
		},
		postAccountOperations: { invalidatesTags: ["Accounts"] },
		postAccountOperationsTransfer: { invalidatesTags: ["Accounts"] },
		postAccountOperationsShareAll: { invalidatesTags: ["Accounts"] },
		getAccountOperations(endpoint) {
			endpoint.providesTags = (result, error, arg) => {
				return [{ type: "Accounts", id: arg.accountId }];
			};
			endpoint.transformResponse = (response: TPageable<GetAccountOperationsApiResponse>, meta) => {
				response.paginator = getPaginator(meta);
				return response;
			};
		},
	},
});

export const { useGetAccountsByIdQuery } = accountsApi;
