import { getRouteIndex } from "routes/get-route-index";

export const getChildrenRoutes = (route?: TRoute<any>) => {
	if (!route?.children) return [];
	const childrenRoutes = Object.values(route.children);
	return childrenRoutes
		.sort((a, b) => getRouteIndex(a) - getRouteIndex(b))
		.filter((x) => !x.hideInMenu && x.navbarName);
};
