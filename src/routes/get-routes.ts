import { BntRoutes } from "routes/config/routes";
import { TRedirect, TRoute } from "@/types";

export const getRoutes = (
	routes: Partial<Record<BntRoutes, TRoute<BntRoutes>>>,
	redirects?: Array<TRedirect>
): Array<TRoute<BntRoutes>> => {
	return Object.values(routes).reduce((acc, route) => {
		const redirect = redirects?.find((r) => r.authenticated && r.from === route.path);
		const newRoute = { ...route, ...(redirect && { authenticatedRedirect: redirect?.to }) };
		const childRoutes = route.children ? getRoutes(route.children, redirects) : [];
		return [...acc, newRoute, ...childRoutes];
	}, [] as Array<TRoute<BntRoutes>>);
};
