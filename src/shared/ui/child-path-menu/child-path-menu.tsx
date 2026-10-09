import type { FC } from "react";

import type { BntRoutes } from "@/shared/config/routes";

import { ChildPathMenuStyled } from "./child-path-menu-styled";

export type TChildPathMenuProps = {
	routes?: Array<TRoute<BntRoutes>>;
};

export const ChildPathMenu: FC<TChildPathMenuProps> = ({ routes = [] }) => {
	return <ChildPathMenuStyled routes={routes} />;
};
