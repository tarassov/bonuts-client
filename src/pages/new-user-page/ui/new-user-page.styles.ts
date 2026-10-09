import { alpha, styled, type Theme } from "@mui/material/styles";

const getWelcomeThemeVars = (theme: Theme): Record<string, string> => {
	const isDarkMode = theme.palette.mode === "dark";
	const darkSurface = theme.palette.background.paper;
	const lightSurface = theme.palette.common.white;

	return {
		"--welcome-panel-bg": alpha(isDarkMode ? darkSurface : lightSurface, isDarkMode ? 0.78 : 0.88),
		"--welcome-panel-border": alpha(theme.palette.text.primary, isDarkMode ? 0.14 : 0.1),
		"--welcome-secondary-text": alpha(theme.palette.text.primary, 0.68),
		"--welcome-primary-text": theme.palette.text.primary,
		"--welcome-divider": alpha(theme.palette.text.primary, isDarkMode ? 0.14 : 0.1),
		"--welcome-accent-border": alpha(theme.palette.primary.main, isDarkMode ? 0.34 : 0.28),
		"--welcome-icon-bg": `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.24)}, ${alpha(theme.palette.primary.main, 0.08)})`,
		"--welcome-primary-main": theme.palette.primary.main,
		"--welcome-success-main": theme.palette.success.main,
		"--welcome-danger-main": theme.palette.error.main,
		"--welcome-shadow": isDarkMode ? `0 20px 60px ${alpha(theme.palette.common.black, 0.24)}` : `0 20px 48px ${alpha(theme.palette.grey[700], 0.12)}`,
	};
};

export const NewUserPageRoot = styled("main")(({ theme }) => ({
	...getWelcomeThemeVars(theme),
	minHeight: "100%",
	color: theme.palette.text.primary,
	overflow: "auto",
	padding: theme.spacing(3),
	[theme.breakpoints.down("sm")]: {
		padding: theme.spacing(2),
	},
}));
