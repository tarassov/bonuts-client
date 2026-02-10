import { apiTenantAdaptor } from "services/adaptor/api-tenant-adaptor";
import { useGetTenantCurrentQuery } from "services/api/bonuts-api";
import { useAppSelector } from "services/redux/store/store";
import { authTenantSelector } from "shared/model/auth/auth-selector";

export const useTenantLoader = () => {
	const authTenant = useAppSelector(authTenantSelector);
	const { data, error, isLoading, refetch } = useGetTenantCurrentQuery(
		{
			tenant: authTenant || undefined,
		},
		{ skip: !authTenant }
	);

	const tenant = apiTenantAdaptor(data);
	return { tenant, isLoading, error, refetch };
};
