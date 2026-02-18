import { apiAccountAdaptor } from "services/adaptor/api-account-adaptor";
import { useGetAccountsByIdQuery } from "services/api/extended/accounts-api";
import { useAppSelector } from "services/redux/store/store";
import { authTenantSelector } from "shared/model/auth/auth-selector";

export const useAccountBalanceLoader = (id?: number | null) => {
	const authTenant = useAppSelector(authTenantSelector);
	const { data, error, isLoading, refetch } = useGetAccountsByIdQuery(
		{
			id: id!,
			tenant: authTenant!,
		},
		{ skip: !id || !authTenant }
	);
	const account = apiAccountAdaptor(data);
	return { account, isLoading, error, refetch };
};
