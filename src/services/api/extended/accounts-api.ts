import { bonutsApi } from "services/api/bonuts-api";
import { cacheByIdArgProperty } from "services/redux/utils/rtk-cache-utils";

// noinspection TypeScriptValidateJSTypes
export const accountsApi = bonutsApi.enhanceEndpoints({
	addTagTypes: ["Accounts"],
	endpoints: {
		getAccountsById: {
			providesTags: cacheByIdArgProperty("Accounts"),
		},
	},
});

export const { useGetAccountsByIdQuery } = accountsApi;
