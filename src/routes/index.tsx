import { getRedirects } from "./redirects";
import {
	accountOperationsRoute,
	activeRequestsRoute,
	closedRequestsRoute,
	dashBoardRoute,
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
	settingsRoute,
	profileRoute,
	peopleRoute,
	requestsRoute,
	activeRequestsRoute,
	closedRequestsRoute,
	incomingRequestsRoute,
	tenantsListRoute,
	statisticsRoute,
	donutsRoute,
	accountOperationsRoute,
	notFoundRoute,
];

export const getRoutes = (): Array<TRoute> => {
	const redirects = getRedirects();
	return appRoutes.map((route) => {
		const redirect = redirects.find(
			(r) => r.authenticated && r.from.path === route.path
		);
		return { ...route, authenticatedRedirect: redirect?.to };
	});
};
