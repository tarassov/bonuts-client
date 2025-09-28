import { blue, grey, red } from "@mui/material/colors";

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
			main: "#5a985f",
			light: "#97cf9e",
			veryLight: "#ebffed",
			dark: "#426644",
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
