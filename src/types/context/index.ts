export type AppContextType = {
	isDrawerOpen: boolean;
	toggleDrawer: () => void;
	menuRoutes: Array<TRoute>;
	routes: Array<TRoute>;
};
