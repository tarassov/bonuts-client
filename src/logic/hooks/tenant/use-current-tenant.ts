import { authTenantSelector } from "shared/model/auth/auth-selector";

import { useAppSelector } from "services/redux/store/store";

export const useCurrentTenant = () => {
	return useAppSelector(authTenantSelector);
};
