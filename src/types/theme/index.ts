export enum EThemeName {
	Dark = "dark",
	Light = "light",
	System = "system",
}

export type TResolvedThemeName = EThemeName.Dark | EThemeName.Light;

export type ThemeContextType = {
	setTheme: (themeName: EThemeName) => void;
	toggleTheme: () => void;
	themeName: EThemeName;
	resolvedThemeName: TResolvedThemeName;
};

declare module "@mui/material/styles" {
	interface PaletteColor {
		veryLight?: string;
	}
	interface Palette {
		accent: Palette["primary"];
		neutral: Palette["primary"];
	}
	interface SimplePaletteColorOptions {
		veryLight?: string;
	}

	interface PaletteOptions {
		accent: PaletteOptions["primary"];
		neutral: PaletteOptions["primary"];
	}
}

declare module "@mui/material/styles" {
	interface TypographyVariants {
		caption2: React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		caption2?: React.CSSProperties;
	}
}

declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		caption2: true;
	}
}
