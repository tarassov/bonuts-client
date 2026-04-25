import { FC } from "react";

import { ChildPathMenu } from "components/child-path";

import { useBntRoutes } from "@/shared/lib/router";

import { getChildrenRoutes } from "routes/get-children-routes";

export const RequestsPage: FC = () => {
	const { routes } = useBntRoutes();
	const childrenRoutes = getChildrenRoutes(routes.Requests);
	return <ChildPathMenu routes={childrenRoutes} />;
};
