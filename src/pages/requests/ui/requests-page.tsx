import type { FC } from "react";

import { useBntRoutes } from "@/shared/lib/router";
import { ChildPathMenu } from "@/shared/ui/child-path-menu";

import { getChildrenRoutes } from "@/routes/get-children-routes";

export const RequestsPage: FC = () => {
	const { routes } = useBntRoutes();
	const childrenRoutes = getChildrenRoutes(routes.Requests);
	return <ChildPathMenu routes={childrenRoutes} />;
};
