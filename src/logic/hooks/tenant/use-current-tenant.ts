import { useAppSelector } from "services/redux/store/store";
import { authTenantSelector } from "services/redux/selectors/auth-selector";

export const useCurrentTenant = () => {
	const authTenant = useAppSelector(authTenantSelector);
	return authTenant;
};
