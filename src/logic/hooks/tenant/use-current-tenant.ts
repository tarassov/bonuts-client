import { useAppSelector } from "services/redux/store/store";

import { authTenantSelector } from "@/shared/model/auth/auth-selector";

export const useCurrentTenant = () => {
	return useAppSelector(authTenantSelector);
};
