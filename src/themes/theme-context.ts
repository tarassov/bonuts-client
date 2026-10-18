import { createContext } from "react";

import { emptyFunction } from "utils/empty-function";

import { EThemeName, ThemeContextType } from "@/types/theme";

export const CustomThemeContext = createContext<ThemeContextType>({
	setTheme: emptyFunction,
	toggleTheme: emptyFunction,
	themeName: EThemeName.System,
	resolvedThemeName: EThemeName.Light,
});
