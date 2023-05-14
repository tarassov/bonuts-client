import { FC } from "react";
import { useBntRoutes } from "hooks/use-bnt-routes";
import { ChildPathMenuPure } from "components/child-path/child-path-menu/child-path-menu-pure";

export type ChildPathMenuProps = {
	route?: TRoute;
};
export const ChildPathMenu: FC<ChildPathMenuProps> = ({ route }) => {
	const { getChildRoutes } = useBntRoutes();
	const childRoutes = getChildRoutes(route);
	return <ChildPathMenuPure routes={childRoutes} />;
};
