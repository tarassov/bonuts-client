import { bonutsApiOverride } from "services/api/injected-api";
import { PutTenantCurrentApiArg, PutTenantCurrentApiResponse } from "services/api/bonuts-api";
import { ApiMethod } from "services/api/helpers/api-method";

const baseApiTenantApi = bonutsApiOverride.enhanceEndpoints({
	addTagTypes: ["Tenant", "Tenants"],
	endpoints: {
		getTenantCurrent: {
			providesTags: ["Tenant"],
		},
		getTenants: {
			providesTags: ["Tenants"],
		},
		getTenantsAccessible: {
			providesTags: ["Tenants"],
		},
	},
});

export const tenantsApi = baseApiTenantApi.injectEndpoints({
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
