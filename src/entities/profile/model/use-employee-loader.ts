import { useMemo } from "react";

import { apiProfileAdaptor } from "services/adaptor/api-profile-adaptor";
import { useGetProfilesByIdQuery } from "services/api/bonuts-api";

import { useProfile } from "@/entities/profile";

export const useEmployeeLoader = (id?: number | string | null) => {
	const { authTenant } = useProfile();
	const { data, error, isLoading } = useGetProfilesByIdQuery({
		id: id?.toString() || "",
		tenant: authTenant || undefined,
	});

	const employee = useMemo(() => apiProfileAdaptor(data), [data]);

	return { employee, isLoading, error };
};
