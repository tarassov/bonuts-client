import { createContext } from "react";

import { BntRoutes } from "shared/config/routes";

export type TRouterContextType = {
	menuRoutes: Array<TRoute<BntRoutes>>;
	routes: Partial<Record<BntRoutes, TRoute<BntRoutes>>>;
	redirects?: Array<TRedirect>;
};

export const RouterContext = createContext<TRouterContextType>({
	menuRoutes: [],
	routes: {},
	redirects: [],
});
