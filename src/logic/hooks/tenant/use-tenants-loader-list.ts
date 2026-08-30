import { apiTenantsAdaptor } from "services/adaptor/api-tenant-adaptor";

import { tenantsApi } from "@/entities/tenant";

import { useListBase } from "logic/hooks/use-list-base";

export const useTenantsLoaderList = () => {
	return useListBase({
		endpoint: tenantsApi.endpoints.getTenants,
		translator: apiTenantsAdaptor,
	});
};
