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

export const getAppRoutes = (): Array<TRoute> => {
	return [
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
};
export const getRouteIndex = (route: TRoute): number => {
	return route.index !== undefined ? route.index : 10;
};
