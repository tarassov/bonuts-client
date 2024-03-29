import { useGetDonutsByIdQuery } from "services/api/bonuts-api";
import { useAppSelector } from "services/redux/store/store";
import { apiDonutToDonut } from "services/adaptor/api-donuts-to-donuts";
import { authTenantSelector } from "services/redux/selectors/auth-selector";

export const useDonutLoader = (id?: string | null) => {
	const authTenant = useAppSelector(authTenantSelector);
	const { data, error, isLoading, refetch } = useGetDonutsByIdQuery({
		id: id || "",
		tenant: authTenant || undefined,
	});

	const donut = apiDonutToDonut(data);
	return { donut, isLoading, error, refetch };
};
