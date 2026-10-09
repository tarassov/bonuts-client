import { useAppSelector } from "services/redux/store/store";

import { authTenantSelector } from "./auth-selector";

export function useAuthTenant() {
	return useAppSelector(authTenantSelector);
}
