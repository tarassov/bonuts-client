import { bonutsApiOverride } from "services/api/form-data-api";

export const tenantApi = bonutsApiOverride.enhanceEndpoints({
	addTagTypes: ["Tenant"],
	endpoints: {
		getTenantCurrent(endpoint) {
			endpoint.providesTags = ["Tenant"];
		},
	},
});
