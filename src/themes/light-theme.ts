import { blue, grey, red } from "@mui/material/colors";

const colors = {
	primary: {
		700: "#f66402",
		500: "#FF8A3D",
		400: "#FFB066",
		100: "#FFE2CC",
	},
	success: {
		500: "#3BB273",
		100: "#DDF3E8",
	},
	accent: {
		500: "#7C5CFC",
		100: "#E7E2FF",
	},
	neutral: {
		900: "#1E1F25",
		600: "#6B7280",
		300: "#E5E7EB",
		100: "#F7F8FA",
		0: "#FFFFFF",
	},
	system: {
		error500: "#E5484D",
		warning500: "#F59E0B",
		info500: "#3B82F6",
	},
	dark: {
		bgApp: "#111318",
		bgSurface: "#1A1D24",
		textPrimary: "#E5E7EB",
		textSecondary: "#9CA3AF",
		border: "#2A2E36",
	},
} as const;

export type BonutsColors = typeof colors;

const lightTheme = {
	typography: {
		caption2: {
			fontWeight: 400,
			fontSize: "0.85rem",
			lineHeight: 1.66,
			letterSpacing: "0.03333em",
		},
	},
	palette: {
		background: {
			default: grey.A100,
			palette: "#FFF",
		},
		primary: {
			main: colors.primary[500],
			light: colors.primary[100],
			veryLight: colors.primary[400],
			dark: colors.primary[700],
		},
		secondary: {
			main: "#d4741a",
			dark: "#c44e0d",
			light: "#e6ad57",
			veryLight: "#FFCF86",
			contrastText: "#575555",
		},
		error: {
			veryLight: red.A100,
			light: red.A200,
			main: red.A700,
		},
		neutral: {
			main: grey.A400,
			dark: grey["800"],
			light: grey.A100,
		},
		info: {
			main: blue.A200,
			dark: blue.A400,
			light: blue.A100,
		},
	},
};

export default lightTheme;
