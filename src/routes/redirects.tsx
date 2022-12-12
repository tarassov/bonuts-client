import { dashBoardRoute, loginRoute } from "./routes";

/**
 * returns array of redirects
 */
export const getRedirects = (): Array<TRedirect> => {
	return [
		{
			from: loginRoute,
			to: dashBoardRoute,
			authenticated: true,
		},
	];
};
