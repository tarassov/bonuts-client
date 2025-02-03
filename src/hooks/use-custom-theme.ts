import { useState, useMemo } from "react";

import { Theme, createTheme, ThemeOptions } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { ThemeContextType, ThemeName } from "@/types/theme";

export const useCustomTheme = (themes: Record<string, ThemeOptions>): [Theme, ThemeContextType] => {
	const OSThemeName: ThemeName = useMediaQuery("(prefers-color-scheme: light)", {
		noSsr: true,
	})
		? "light"
		: "dark";

	const savedThemeName = localStorage.getItem("theme") as string | null;

	const initialThemeName =
		savedThemeName && savedThemeName in themes ? (savedThemeName as ThemeName) : OSThemeName;

	const [themeName, setThemeName] = useState<ThemeName>(initialThemeName);

	const setTheme = (name: ThemeName) => {
		localStorage.setItem("theme", name);
		setThemeName(name);
	};

	const toggleTheme = () => {
		if (themeName === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	const themeOptions = themes[themeName];

	const theme = useMemo(() => createTheme({ ...themeOptions, cssVariables: true }), [themeOptions]);

	return [theme, { setTheme, toggleTheme }];
};
