import { useMemo } from "react";

import { authTenantSelector } from "shared/model/auth/auth-selector";

import { apiDonutToDonut } from "services/adaptor/api-donuts-to-donuts";
import { useGetDonutsByIdQuery } from "services/api/bonuts-api";
import { useAppSelector } from "services/redux/store/store";

export const useDonutLoader = (id?: string | null) => {
	const authTenant = useAppSelector(authTenantSelector);
	const { data, error, isLoading, refetch } = useGetDonutsByIdQuery({ id: id || "", tenant: authTenant || undefined });

	const donut = useMemo(() => apiDonutToDonut(data), [data]);

	return { donut, isLoading, error, refetch };
};
