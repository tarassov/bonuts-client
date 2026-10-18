import { useContext, useMemo } from "react";

import _ from "lodash";

import { BntRoutes } from "@/shared/config/routes";
import { RouterContext } from "@/shared/lib/router";
import { isBlank } from "@/shared/lib/type-guards";
import { useAuth, useCurrentProfile } from "@/shared/model/auth";

import { tenantsApi } from "@/entities/tenant";

import { routesPath } from "@/routes/config/routes-path";

export const useAuthRoutes = () => {
	const { menuRoutes: routes } = useContext(RouterContext);
	const { auth } = useAuth();
	const { currentRoles } = useCurrentProfile();
	const { data: tenantsData } = tenantsApi.endpoints.getTenants.useQuery(undefined, {
		skip: !auth.isAuthenticated,
	});

	const tenantCount = isBlank(tenantsData) || isBlank(tenantsData.data) ? 0 : tenantsData.data.length;
	const hasOneOrZeroTenant = tenantCount <= 1;

	const menuRoutes = useMemo(() => {
		return routes
			.filter((x) => x.tenantNotRequired || auth.tenant)
			.filter((x) => (auth.tenant ? x.path !== routesPath[BntRoutes.NewUser] : x.path !== routesPath[BntRoutes.Dashboard]))
			.filter((x) => !hasOneOrZeroTenant || x.path !== routesPath[BntRoutes.TenantList])
			.filter((x) => !x.roles?.length || _.intersection(x.roles, currentRoles).length);
	}, [routes, auth.tenant, currentRoles, hasOneOrZeroTenant]);

	return { menuRoutes };
};
