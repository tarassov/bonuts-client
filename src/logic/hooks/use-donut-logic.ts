import { useGetDonutsByIdQuery } from "services/api/bonuts-api";
import { useAppSelector } from "services/redux/store/store";
import { apiDonutToDonut } from "services/adaptor/api-donuts-to-donuts";
import { authTenantSelector } from "services/redux/selectors/auth-selector";

export const useDonutLogic = (id?: string | null) => {
	const authTenant = useAppSelector(authTenantSelector);
	const { data, error, isLoading } = useGetDonutsByIdQuery({
		id: id || "",
		tenant: authTenant || undefined,
	});

	const donut = apiDonutToDonut(data);
	return { donut, isLoading, error };
};
