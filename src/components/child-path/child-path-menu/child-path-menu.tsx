import { FC } from "react";
import { ChildPathMenuStyled } from "components/child-path/child-path-menu/child-path-menu-styled";
import { BntRoutes } from "routes/config/routes";

export type ChildPathMenuProps = {
	routes?: Array<TRoute<BntRoutes>>;
};
export const ChildPathMenu: FC<ChildPathMenuProps> = ({ routes = [] }) => {
	return <ChildPathMenuStyled routes={routes} />;
};
