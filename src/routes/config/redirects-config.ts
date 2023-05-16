import { routesPath } from "routes/config/routes-path";
import { BntRoutes } from "routes/config/routes";

export const redirectConfig: RedirectConfig = {
	redirects: [
		{
			from: routesPath[BntRoutes.Login],
			to: routesPath[BntRoutes.Dashboard],
			authenticated: true,
		},
	],
};
