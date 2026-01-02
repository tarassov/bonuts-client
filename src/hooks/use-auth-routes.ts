import { useContext, useMemo } from "react";
import { AppContext } from "context/app-context";
import _ from "lodash";
import { useAuth } from "shared/model/auth/use-auth";

import { useCurrentProfile } from "@/entities/profile";

export const useAuthRoutes = () => {
	const { menuRoutes: routes } = useContext(AppContext);
	const { auth } = useAuth();
	const { currentRoles } = useCurrentProfile();

	const menuRoutes = useMemo(() => {
		return routes
			.filter((x) => x.tenantNotRequired || auth.tenant)
			.filter((x) => !x.roles?.length || _.intersection(x.roles, currentRoles).length);
	}, [routes, auth.tenant, currentRoles]);

	return { menuRoutes };
};
