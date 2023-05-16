import { createContext } from "react";
import { ThemeContextType } from "@/types/theme";

export const CustomThemeContext = createContext<ThemeContextType>({
	setTheme: () => {},
	toggleTheme: () => {},
});
