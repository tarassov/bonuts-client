import { useListBase } from "logic/hooks/use-list-base";
import { tenantsApi } from "services/api/extended/tenants-api";
import { apiTenantsAdaptor } from "services/adaptor/api-tenant-adaptor";

export const useAccessibleTenantsLoaderList = () => {
	return useListBase({
		endpoint: tenantsApi.endpoints.getTenantsAccessible,
		translator: apiTenantsAdaptor,
	});
};
