import { useAppSelector } from "services/redux/store/store";

import { authTenantSelector } from "@/shared/model/auth";

export const useCurrentTenant = () => {
	return useAppSelector(authTenantSelector);
};
