import { useGetProfilesByIdQuery } from "services/api/bonuts-api";
import { apiProfileToProfile } from "services/adaptor/api-profile-to-profile";
import { useProfileLogic } from "logic/hooks/use-profile-logic";

export const useEmployeeLogic = (id?: string | null) => {
	const { authTenant } = useProfileLogic();
	const { data, error, isLoading } = useGetProfilesByIdQuery({
		id: id || "",
		tenant: authTenant || undefined,
	});

	const employee = apiProfileToProfile(data);
	return { employee, isLoading, error };
};
