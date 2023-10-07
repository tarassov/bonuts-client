import { usePostTenantsByTenantNameJoinMutation } from "services/api/bonuts-api";
import { useAuth } from "logic/hooks/auth/use-auth";
import { TTenant } from "@/types/model/tenant";

export const useTenant = (tenant?: TTenant) => {
	const [postJoin] = usePostTenantsByTenantNameJoinMutation();
	const { checkAuth } = useAuth();
	const joinTenant = () => {
		if (tenant) {
			postJoin({ tenantName: tenant.name }).then(() => checkAuth());
		}
	};

	return { joinTenant };
};
