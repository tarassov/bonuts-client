import { getRedirects } from "./redirects";
import {
	dashBoardRoute,
	homeRoute,
	loginRoute,
	profileRoute,
	settingsRoute,
} from "./routes";

const appRoutes: Array<TRoute> = [
	homeRoute,
	loginRoute,
	dashBoardRoute,
	settingsRoute,
	profileRoute,
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
