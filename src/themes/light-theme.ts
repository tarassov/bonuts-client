import { blue, grey, red } from "@mui/material/colors";

const lightTheme = {
	palette: {
		background: {
			default: grey.A100,
			palette: "#FFF",
		},
		primary: {
			main: "#5a985f",
			light: "#97cf9e",
			dark: "#426644",
		},
		secondary: {
			main: "#d4741a",
			dark: "#c44e0d",
			light: "#e6ad57",
			veryLight: "#FFCF86",
		},
		error: {
			main: red.A400,
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
