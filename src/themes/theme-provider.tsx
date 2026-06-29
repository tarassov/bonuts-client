import { createContext, FC, ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import { useCustomTheme } from "hooks/use-custom-theme";
import { emptyFunction } from "utils/empty-function";

import darkTheme from "./dark-theme";
import lightTheme from "./light-theme";
import { EThemeName, ThemeContextType } from "@/types/theme";

const themes = {
	dark: darkTheme,
	light: lightTheme,
};

export const CustomThemeContext = createContext<ThemeContextType>({
	setTheme: emptyFunction,
	toggleTheme: emptyFunction,
	themeName: EThemeName.System,
	resolvedThemeName: EThemeName.Light,
});

type ThemeProviderProps = {
	children?: ReactNode;
};
export const BntThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	const [theme, changeThemeMethods] = useCustomTheme(themes);

	return (
		<StyledEngineProvider injectFirst>
			<CustomThemeContext.Provider value={changeThemeMethods}>
				<MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
			</CustomThemeContext.Provider>
		</StyledEngineProvider>
	);
};
