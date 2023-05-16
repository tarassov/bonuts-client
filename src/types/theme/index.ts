export type ThemeName = "dark" | "light";

export type ThemeContextType = {
	setTheme: (themeName: ThemeName) => void;
	toggleTheme: () => void;
};

declare module "@mui/material/styles" {
	interface PaletteColor {
		veryLight?: string;
	}
	interface Palette {
		neutral: Palette["primary"];
	}
	interface SimplePaletteColorOptions {
		veryLight?: string;
	}

	interface PaletteOptions {
		neutral: PaletteOptions["primary"];
	}
}
