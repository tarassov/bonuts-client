import { useMemo } from "react";

import { tenantsApi } from "@/entities/tenant";

export const useAccessibleTenantsLoaderList = () => {
	const { data, isLoading, isSuccess, refetch } = tenantsApi.useGetTenantsAccessibleQuery();
	const objects = useMemo(() => data?.data ?? [], [data?.data]);

	return { objects, isLoading, isSuccess, refetch };
};
