import { authTenantSelector } from "shared/model/auth/auth-selector";

import { apiCircleAdaptor } from "services/adaptor/api-circle-adaptor";
import { useGetCirclesByIdQuery } from "services/api/extended/circles-api";
import { useAppSelector } from "services/redux/store/store";

export const useCircleLoader = (id?: number | null) => {
	const authTenant = useAppSelector(authTenantSelector);
	const { data, error, isLoading, refetch } = useGetCirclesByIdQuery(
		{
			id: id!,
			tenant: authTenant || undefined,
		},
		{ skip: !id }
	);
	const circle = apiCircleAdaptor(data);
	return { circle, isLoading, error, refetch };
};
