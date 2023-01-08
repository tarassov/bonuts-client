export type ThemeName = "dark" | "light";

export type ThemeContextType = {
	setTheme: (themeName: ThemeName) => void;
	toggleTheme: () => void;
};

declare module "@mui/material/styles" {
	interface Palette {
		neutral: Palette["primary"];
	}

	interface PaletteOptions {
		neutral: PaletteOptions["primary"];
	}
}
