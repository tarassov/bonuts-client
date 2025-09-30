import { apiAdaptor } from "services/adaptor/api-adaptor";
import { useGetEventsByIdQuery } from "services/api/extended/events-api";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { useAppSelector } from "services/redux/store/store";

export const useEventLoader = (id?: number | string | null) => {
	const authTenant = useAppSelector(authTenantSelector);
	const { data, error, isLoading } = useGetEventsByIdQuery(
		{
			id: id?.toString() || "",
			tenant: authTenant || undefined,
		},
		{ skip: !id, refetchOnMountOrArgChange: true }
	);

	const post = data ? apiAdaptor.toPost(data) : undefined;
	return { post, isLoading, error };
};
