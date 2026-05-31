import { useContext, useMemo } from "react";

import _ from "lodash";

import { BntRoutes } from "@/shared/config/routes";
import { RouterContext } from "@/shared/lib/router";
import { useAuth, useCurrentProfile } from "@/shared/model/auth";

import { routesPath } from "@/routes/config/routes-path";
import { tenantsApi } from "@/services/api/extended/tenants-api";

export const useAuthRoutes = () => {
	const { menuRoutes: routes } = useContext(RouterContext);
	const { auth } = useAuth();
	const { currentRoles } = useCurrentProfile();
	const { data: tenantsData } = tenantsApi.endpoints.getTenants.useQuery(undefined, {
		skip: !auth.isAuthenticated,
	});

	const tenantCount = tenantsData?.data?.length;
	const hasOnlyOneTenant = tenantCount === 1;

	const menuRoutes = useMemo(() => {
		return routes
			.filter((x) => x.tenantNotRequired || auth.tenant)
			.filter((x) => (auth.tenant ? x.path !== routesPath[BntRoutes.NewUser] : x.path !== routesPath[BntRoutes.Dashboard]))
			.filter((x) => !hasOnlyOneTenant || x.path !== routesPath[BntRoutes.TenantList])
			.filter((x) => !x.roles?.length || _.intersection(x.roles, currentRoles).length);
	}, [routes, auth.tenant, currentRoles, hasOnlyOneTenant]);

	return { menuRoutes };
};
