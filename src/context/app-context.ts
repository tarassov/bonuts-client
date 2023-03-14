import { createContext } from "react";
import { AppContextType } from "../types/context";

export const AppContext = createContext<AppContextType>({
	isDrawerOpen: false,
	toggleDrawer: () => {},
	menuRoutes: [],
	routes: [],
});
