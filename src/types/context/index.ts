import { BntRoutes } from "routes/config/routes";

export type AppContextType = {
	isDrawerOpen: boolean;
	toggleDrawer: () => void;
	menuRoutes: Array<TRoute<BntRoutes>>;
	routes: Partial<Record<BntRoutes, TRoute<BntRoutes>>>;
	redirects?: Array<TRedirect>;
};
