import { getRedirects } from "./redirects";
import {
	dashBoardRoute,
	homeRoute,
	loginRoute,
	peopleRoute,
	profileRoute,
	settingsRoute,
} from "./routes";

const appRoutes: Array<TRoute> = [
	homeRoute,
	loginRoute,
	dashBoardRoute,
	settingsRoute,
	profileRoute,
	peopleRoute,
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
