import { getRouteIndex } from "routes/get-route-index";

export const getChildrenRoutes = <T>(route?: TRoute<T>) => {
	if (!route?.children) return [];
	const childrenRoutes: Array<TRoute<T>> = Object.values(route.children);
	return (
		childrenRoutes
			.sort((a, b) => getRouteIndex(a) - getRouteIndex(b))
			.filter((x) => x && !x?.hideInMenu && x?.navbarName) || []
	);
};
