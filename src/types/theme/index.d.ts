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

declare module "@mui/material/styles" {
	interface TypographyVariants {
		caption2: React.CSSProperties;
	}

	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		caption2?: React.CSSProperties;
	}
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		caption2: true;
	}
}
