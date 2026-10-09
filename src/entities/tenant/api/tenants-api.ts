import type { PutTenantCurrentApiArg, PutTenantCurrentApiResponse } from "@/services/api/bonuts-api";
import { bonutsApi } from "@/services/api/bonuts-api";
import { ApiMethod } from "@/services/api/helpers/api-method";

const tenantsApiEnhanced = bonutsApi.enhanceEndpoints({
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
		postTenantsByTenantNameJoin: {
			invalidatesTags: ["Tenants"],
		},
	},
});

export const tenantsApi = tenantsApiEnhanced.injectEndpoints({
	endpoints: (build) => ({
		updateCurrentTenantFormData: build.mutation<PutTenantCurrentApiResponse, PutTenantCurrentApiArg>({
			invalidatesTags: ["Tenant"],
			query(data) {
				return ApiMethod("/tenant/current", "PUT", data);
			},
		}),
	}),
});
