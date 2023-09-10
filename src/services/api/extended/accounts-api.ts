import { bonutsApi, GetAccountOperationsApiResponse } from "services/api/bonuts-api";
import { cacheByIdArgProperty } from "services/redux/utils/rtk-cache-utils";
import { getPaginator } from "services/api/helpers/get-paginator";
import { TPageable } from "@/types/api/api";

// noinspection TypeScriptValidateJSTypes
export const accountsApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Accounts", "History"],
	endpoints: {
		getAccountsById: {
			providesTags: cacheByIdArgProperty("Accounts", "Balance"),
		},
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
