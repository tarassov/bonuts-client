import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

import { EThemeName, ThemeContextType, TResolvedThemeName } from "@/types/theme";

export const useCustomTheme = (themes: Record<string, ThemeOptions>): [Theme, ThemeContextType] => {
	const OSThemeName: TResolvedThemeName = useMediaQuery("(prefers-color-scheme: light)", {
		noSsr: true,
	})
		? EThemeName.Light
		: EThemeName.Dark;

	const savedThemeName = localStorage.getItem("theme") as string | null;
	const isSavedThemeValid = savedThemeName === EThemeName.Light || savedThemeName === EThemeName.Dark || savedThemeName === EThemeName.System;
	const initialThemeName: EThemeName = isSavedThemeValid ? (savedThemeName as EThemeName) : EThemeName.Light;

	const [themeName, setThemeName] = useState<EThemeName>(initialThemeName);
	const resolvedThemeName: TResolvedThemeName = themeName === EThemeName.System ? OSThemeName : themeName;

	const setTheme = (name: EThemeName) => {
		localStorage.setItem("theme", name);
		setThemeName(name);
	};

	const toggleTheme = () => {
		if (resolvedThemeName === EThemeName.Dark) {
			setTheme(EThemeName.Light);
		} else {
			setTheme(EThemeName.Dark);
		}
	};

	const themeOptions = themes[resolvedThemeName];

	const theme = useMemo(() => createTheme({ ...themeOptions, cssVariables: true }), [themeOptions]);

	useEffect(() => {
		document.documentElement.setAttribute("data-app-theme", resolvedThemeName);
		document.documentElement.setAttribute("data-app-theme-preference", themeName);
	}, [resolvedThemeName, themeName]);

	return [theme, { setTheme, toggleTheme, themeName, resolvedThemeName }];
};
