import { getRouteIndex } from "routes/get-route-index";
import { BntRoutes } from "routes/config/routes";

export const getMenuRoutes = (config: TRouteConfig<BntRoutes>) => {
	const routes = Object.values(config.routes);
	return routes
		.filter((x) => x && !x.hideInMenu && x.navbarName)
		.sort((a, b) => getRouteIndex(a) - getRouteIndex(b));
};
