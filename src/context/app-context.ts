import { createContext } from "react";

import { emptyFunction } from "utils/empty-function";

import { AppContextType } from "@/types/context/app-context-type";

export const AppContext = createContext<AppContextType>({
	isDrawerOpen: false,
	toggleDrawer: emptyFunction,
	menuRoutes: [],
	routes: {},
});
