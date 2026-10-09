import { BntRoutes } from "@/shared/config/routes";

import type { TTenant } from "@/types/model/tenant";

export enum TenantlessUserState {
	Tenants = "tenants",
	Welcome = "welcome",
}

const isActiveTenant = (tenant: TTenant): boolean => {
	return tenant.active && !tenant.deactivated;
};

export const getTenantlessUserState = (tenants: Array<TTenant>): TenantlessUserState => {
	if (tenants.some(isActiveTenant)) {
		return TenantlessUserState.Tenants;
	}

	return TenantlessUserState.Welcome;
};

export const getTenantlessLandingRoute = (tenants: Array<TTenant>): BntRoutes => {
	return getTenantlessUserState(tenants) === TenantlessUserState.Tenants ? BntRoutes.TenantList : BntRoutes.NewUser;
};
