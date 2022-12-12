export type ThemeName = "dark" | "light";

export type ThemeContextType = {
	setTheme: (themeName: ThemeName) => void;
	toggleTheme: () => void;
};
