import { useMemo } from "react";

import { apiProfileAdaptor } from "services/adaptor/api-profile-adaptor";
import { useGetProfilesByIdQuery } from "services/api/bonuts-api";

import { useProfileLogic } from "@/entities/profile";

export const useEmployeeLoader = (id?: number | string | null) => {
	const { authTenant } = useProfileLogic();
	const { data, error, isLoading } = useGetProfilesByIdQuery({
		id: id?.toString() || "",
		tenant: authTenant || undefined,
	});

	const employee = useMemo(() => apiProfileAdaptor(data), [data]);

	return { employee, isLoading, error };
};
