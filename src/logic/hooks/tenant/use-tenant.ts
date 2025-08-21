import { usePostTenantsByTenantNameJoinMutation } from "services/api/bonuts-api";
import { useAuth } from "shared/model/auth/use-auth";
import { TTenant } from "@/types/model/tenant";

export const useTenant = (tenant?: TTenant) => {
	const [postJoin] = usePostTenantsByTenantNameJoinMutation();
	const { setTenant } = useAuth();
	const joinTenant = () => {
		if (tenant) {
			postJoin({ tenantName: tenant.name }).then(() => {
				setTenant(tenant.name);
			});
		}
	};

	return { joinTenant };
};
