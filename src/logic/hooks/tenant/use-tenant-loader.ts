import { useAppSelector } from "services/redux/store/store";
import { useGetTenantCurrentQuery } from "services/api/bonuts-api";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { apiTenantAdaptor } from "services/adaptor/api-tenant-adaptor";

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
