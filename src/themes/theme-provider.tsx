import { createContext, FC } from "react";

import {
	StyledEngineProvider,
	ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import darkTheme from "./dark-theme";
import lightTheme from "./light-theme";
import { ThemeContextType } from "../types/theme";
import { useCustomTheme } from "../hooks/use-custom-theme";

const themes = {
	dark: darkTheme,
	light: lightTheme,
};

export const CustomThemeContext = createContext<ThemeContextType>({
	setTheme: () => {},
	toggleTheme: () => {},
});

type ThemeProviderProps = {
	children?: React.ReactNode;
};
export const BNTThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	const [theme, changeThemeMethods] = useCustomTheme(themes);

	return (
		<StyledEngineProvider injectFirst>
			<CustomThemeContext.Provider value={changeThemeMethods}>
				<MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
			</CustomThemeContext.Provider>
		</StyledEngineProvider>
	);
};
