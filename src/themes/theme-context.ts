import { createContext } from "react";

import { emptyFunction } from "utils/empty-function";

import { ThemeContextType } from "@/types/theme";

export const CustomThemeContext = createContext<ThemeContextType>({
	setTheme: emptyFunction,
	toggleTheme: emptyFunction,
});
