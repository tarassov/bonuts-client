import type { FC } from "react";

import { useBntRoutes } from "@/shared/lib/router";
import { ChildPathMenu } from "@/shared/ui/child-path-menu";

import { getChildrenRoutes } from "@/routes/get-children-routes";

export const SettingsPage: FC = () => {
	const { routes } = useBntRoutes();
	const childrenRoutes = getChildrenRoutes(routes.Settings);

	return <ChildPathMenu routes={childrenRoutes} />;
};
