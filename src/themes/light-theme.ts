import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const lightTheme = {
	palette: {
		// mode: "light",
		primary: {
			main: "#5a985f",
			light: "#97cf9e",
			dark: "#426644",
		},
		secondary: {
			main: "#d4741a",
			dark: "#c44e0d",
			light: "#e6ad57",
		},
		error: {
			main: red.A400,
		},
	},
};

export default lightTheme;
