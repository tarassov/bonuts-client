import { useGetProfilesByIdQuery } from "services/api/bonuts-api";
import { apiProfileAdaptor } from "services/adaptor/api-profile-adaptor";
import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";

export const useEmployeeLoader = (id?: number | string | null) => {
	const { authTenant } = useProfileLogic();
	const { data, error, isLoading } = useGetProfilesByIdQuery({
		id: id?.toString() || "",
		tenant: authTenant || undefined,
	});

	const employee = apiProfileAdaptor(data);
	return { employee, isLoading, error };
};
