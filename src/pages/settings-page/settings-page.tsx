import { FC } from "react";
import { ChildPathMenu } from "components/child-path";
import { useBntRoutes } from "hooks/use-bnt-routes";
import { getChildrenRoutes } from "routes/get-children-routes";

export const SettingsPage: FC = () => {
	const { routes } = useBntRoutes();
	const childrenRoutes = getChildrenRoutes(routes.Settings);
	return <ChildPathMenu routes={childrenRoutes} />;
};
