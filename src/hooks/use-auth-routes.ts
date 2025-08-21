import { useContext, useMemo } from "react";
import { AppContext } from "context/app-context";
import { useAuth } from "shared/model/auth/use-auth";
import _ from "lodash";

export const useAuthRoutes = () => {
	const { menuRoutes: routes } = useContext(AppContext);
	const { currentRoles, auth } = useAuth();

	const menuRoutes = useMemo(() => {
		return routes
			.filter((x) => x.tenantNotRequired || auth.tenant)
			.filter((x) => !x.roles?.length || _.intersection(x.roles, currentRoles).length);
	}, [routes, currentRoles]);

	return { menuRoutes };
};
