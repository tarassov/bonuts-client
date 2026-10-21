import type { FC } from "react";

import { isRouteFeatureEnabled, useBntRoutes } from "@/shared/lib/router";
import { ChildPathMenu } from "@/shared/ui/child-path-menu";

import { useTenantFeatureFlags } from "@/entities/tenant";

import { getChildrenRoutes } from "@/routes/get-children-routes";

export const SettingsPage: FC = () => {
	const { routes } = useBntRoutes();
	const { featureFlags } = useTenantFeatureFlags();
	const childrenRoutes = getChildrenRoutes(routes.Settings).filter((route) => isRouteFeatureEnabled(route, featureFlags));

	return <ChildPathMenu routes={childrenRoutes} />;
};
