import { createContext, FC, ReactNode } from "react";

import { StyledEngineProvider, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useCustomTheme } from "hooks/use-custom-theme";
import darkTheme from "./dark-theme";
import lightTheme from "./light-theme";
import { ThemeContextType } from "@/types/theme";

const themes = {
	dark: darkTheme,
	light: lightTheme,
};

export const CustomThemeContext = createContext<ThemeContextType>({
	setTheme: () => {},
	toggleTheme: () => {},
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
