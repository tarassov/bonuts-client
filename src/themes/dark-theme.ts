import { blue, grey, red } from "@mui/material/colors";

import { formComponents } from "./form-components";

const darkTheme = {
	typography: {
		caption2: {
			fontWeight: 400,
			fontSize: "0.85rem",
			lineHeight: 1.66,
			letterSpacing: "0.03333em",
		},
	},
	components: formComponents,
	palette: {
		mode: "dark" as const,
		background: {
			default: "#111318",
			paper: "#1A1D24",
			palette: "#1A1D24",
		},
		text: {
			primary: "#E5E7EB",
			secondary: "#9CA3AF",
		},
		divider: "#2A2E36",
		primary: {
			main: "#FF8A3D",
			light: "#FFB066",
			veryLight: "#FFE2CC",
			dark: "#f66402",
		},
		accent: {
			main: "#9A84FF",
			light: "#2E2B49",
			veryLight: "#3C3760",
			dark: "#C7BCFF",
		},
		secondary: {
			main: "#d4741a",
			dark: "#c44e0d",
			light: "#e6ad57",
			veryLight: "#FFCF86",
			contrastText: "#111318",
		},
		error: {
			veryLight: red.A100,
			light: red.A200,
			main: red.A700,
		},
		neutral: {
			main: "#6B7280",
			dark: "#E5E7EB",
			light: "#2A2E36",
		},
		info: {
			main: blue.A200,
			dark: blue.A100,
			light: blue.A400,
		},
		grey,
	},
};

export default darkTheme;
