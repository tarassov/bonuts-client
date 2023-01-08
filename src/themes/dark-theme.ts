import { blue, deepPurple, grey, red, teal } from "@mui/material/colors";

const darkTheme = {
	palette: {
		// mode: "dark",
		primary: {
			main: deepPurple["A100"],
		},
		secondary: teal,
		neutral: {
			main: grey["A200"],
			dark: grey["A400"],
			light: grey["A100"],
		},
		info: {
			main: blue["A200"],
			dark: blue["A400"],
			light: blue["A100"],
		},
	},
};

export default darkTheme;
