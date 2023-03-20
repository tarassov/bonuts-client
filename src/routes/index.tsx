import { getRedirects } from "./redirects";
import {
	accountOperationsRoute,
	activeRequestsRoute,
	closedRequestsRoute,
	dashBoardRoute,
	donutPreviewRoute,
	donutsRoute,
	homeRoute,
	incomingRequestsRoute,
	loginRoute,
	logoutRoute,
	notFoundRoute,
	peopleRoute,
	profileRoute,
	recoverRoute,
	registrationRoute,
	requestsRoute,
	restoreRoute,
	settingsRoute,
	statisticsRoute,
	tenantsListRoute,
} from "./routes";

const appRoutes: Array<TRoute> = [
	homeRoute,
	registrationRoute,
	recoverRoute,
	restoreRoute,
	loginRoute,
	logoutRoute,
	dashBoardRoute,
	profileRoute,
	donutsRoute,
	peopleRoute,
	requestsRoute,
	activeRequestsRoute,
	closedRequestsRoute,
	incomingRequestsRoute,
	tenantsListRoute,
	statisticsRoute,
	accountOperationsRoute,
	notFoundRoute,
	settingsRoute,
	donutPreviewRoute,
];
export const getRouteIndex = (route: TRoute): number => {
	return route.index !== undefined ? route.index : 100;
};

export const getRoutes = (): Array<TRoute> => {
	const redirects = getRedirects();
	return appRoutes
		.sort((a, b) => getRouteIndex(a) - getRouteIndex(b))
		.map((route) => {
			const redirect = redirects.find(
				(r) => r.authenticated && r.from.path === route.path
			);
			return { ...route, authenticatedRedirect: redirect?.to };
		});
};
