import { apiTenantsAdaptor } from "services/adaptor/api-tenant-adaptor";
import { tenantsApi } from "services/api/extended/tenants-api";

import { useListBase } from "logic/hooks/use-list-base";

export const useTenantsLoaderList = () => {
	return useListBase({
		endpoint: tenantsApi.endpoints.getTenants,
		translator: apiTenantsAdaptor,
	});
};
