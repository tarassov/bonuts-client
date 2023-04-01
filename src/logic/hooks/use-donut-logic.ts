import { useGetDonutsByIdQuery } from "../../services/api/bonuts-api";
import { useAppSelector } from "../../services/store/store";
import { authTenantSelector } from "../../services/redux/auth-slice";
import { apiDonutToDonut } from "../../services/adaptor/api-donuts-to-donuts";

export const useDonutLogic = (id?: string | null) => {
	const authTenant = useAppSelector(authTenantSelector);
	const { data, error, isLoading } = useGetDonutsByIdQuery({
		id: id || "",
		tenant: authTenant || undefined,
	});

	const donut = apiDonutToDonut(data);
	return { donut, isLoading, error };
};
