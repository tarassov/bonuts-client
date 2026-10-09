import { useMemo } from "react";

import { tenantsApi } from "@/entities/tenant";

export const useTenantsLoaderList = () => {
	const { data, isLoading, isSuccess, refetch } = tenantsApi.useGetTenantsQuery();
	const objects = useMemo(() => data?.data ?? [], [data?.data]);

	return { objects, isLoading, isSuccess, refetch };
};
