import { useContext, useMemo } from "react";
import { AppContext } from "context/app-context";
import { useAuth } from "hooks/use-auth";
import _ from "lodash";

export const useAuthRoutes = () => {
	const { menuRoutes: routes } = useContext(AppContext);
	const { currentRoles } = useAuth();

	const menuRoutes = useMemo(() => {
		return routes.filter((x) => !x.roles?.length || _.intersection(x.roles, currentRoles).length);
	}, [routes, currentRoles]);

	return { menuRoutes };
};
