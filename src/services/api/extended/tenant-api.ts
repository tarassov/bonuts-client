import { bonutsApiOverride } from "services/api/form-data-api";
import { PutTenantCurrentApiArg, PutTenantCurrentApiResponse } from "services/api/bonuts-api";
import { ApiMethod } from "services/api/helpers/api-method";

const baseApiTenantApi = bonutsApiOverride.enhanceEndpoints({
	addTagTypes: ["Tenant"],
	endpoints: {
		getTenantCurrent: {
			providesTags: ["Tenant"],
		},
	},
});

export const tenantApi = baseApiTenantApi.injectEndpoints({
	endpoints: (build) => ({
		updateCurrentTenantFormData: build.mutation<
			PutTenantCurrentApiResponse,
			PutTenantCurrentApiArg
		>({
			invalidatesTags: ["Tenant"],
			query(data) {
				return ApiMethod(`/tenant/current`, "PUT", data);
			},
		}),
	}),
});
