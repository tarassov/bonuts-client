import { useAppDispatch } from "services/redux/store/store";
import { push } from "redux-first-history";
import { useCallback } from "react";
import { getRedirects } from "routes/redirects";
import { getAppRoutes, getRouteIndex } from "@/routes";

export const useBntRoutes = () => {
	const dispatch = useAppDispatch();

	const navigate = useCallback(
		(path: string) => {
			dispatch(push(path));
		},
		[dispatch]
	);
	const getRoutes = useCallback((): Array<TRoute> => {
		return getAppRoutes()
			.sort((a, b) => getRouteIndex(a) - getRouteIndex(b))
			.map((route) => {
				const redirect = getRedirects().find((r) => r.authenticated && r.from.path === route.path);
				return { ...route, authenticatedRedirect: redirect?.to };
			});
	}, [getAppRoutes, getRedirects]);

	const getMenuRoutes = useCallback(() => {
		return getRoutes().filter((x) => !x.hideInMenu && x.navbarName && !x.parentRoute);
	}, [getRoutes]);

	const getChildRoutes = useCallback(
		(route?: TRoute) => {
			if (!route) return [];
			return getRoutes().filter((appRoute) => appRoute.parentRoute?.path === route.path);
		},
		[getAppRoutes]
	);

	return { navigate, getRoutes, getMenuRoutes, getChildRoutes };
};
