import { useGetCirclesByIdQuery } from "services/api/extended/circles-api";
import { useAppSelector } from "services/redux/store/store";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { apiCircleAdaptor } from "services/adaptor/api-circle-adaptor";

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
