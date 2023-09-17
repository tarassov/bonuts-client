import { createContext } from "react";
import { AppContextType } from "@/types/context/app-context-type";

export const AppContext = createContext<AppContextType>({
	isDrawerOpen: false,
	toggleDrawer: () => {},
	menuRoutes: [],
	routes: {},
});
