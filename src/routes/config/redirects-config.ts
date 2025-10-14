import { BntRoutes } from "routes/config/routes";
import { routesPath } from "routes/config/routes-path";

export const redirectConfig: RedirectConfig = {
	redirects: [
		{
			from: routesPath[BntRoutes.Login],
			to: routesPath[BntRoutes.Dashboard],
			authenticated: true,
		},
	],
};
