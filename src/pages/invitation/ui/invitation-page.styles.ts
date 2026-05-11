import { Button } from "@mui/material";
import { alpha, styled, type Theme } from "@mui/material/styles";

const getInvitationThemeVars = (theme: Theme): Record<string, string> => {
	const isDarkMode = theme.palette.mode === "dark";
	const darkSurface = theme.palette.background.paper;
	const lightSurface = theme.palette.common.white;

	return {
		"--invitation-panel-bg": alpha(isDarkMode ? darkSurface : lightSurface, isDarkMode ? 0.78 : 0.88),
		"--invitation-panel-border": alpha(theme.palette.text.primary, isDarkMode ? 0.14 : 0.1),
		"--invitation-primary-text": theme.palette.text.primary,
		"--invitation-secondary-text": alpha(theme.palette.text.primary, 0.68),
		"--invitation-muted-text": alpha(theme.palette.text.primary, 0.58),
		"--invitation-divider": alpha(theme.palette.text.primary, isDarkMode ? 0.14 : 0.1),
		"--invitation-step-line": alpha(theme.palette.text.primary, isDarkMode ? 0.34 : 0.2),
		"--invitation-accent-border": alpha(theme.palette.primary.main, isDarkMode ? 0.34 : 0.28),
		"--invitation-icon-bg": `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.24)}, ${alpha(theme.palette.primary.main, 0.08)})`,
		"--invitation-primary-main": theme.palette.primary.main,
		"--invitation-primary-dark": theme.palette.primary.dark,
		"--invitation-primary-light": theme.palette.primary.light,
		"--invitation-primary-contrast": theme.palette.getContrastText(theme.palette.primary.light),
		"--invitation-success-main": theme.palette.success.main,
		"--invitation-success-light": theme.palette.success.light,
		"--invitation-success-contrast": theme.palette.getContrastText(theme.palette.success.main),
		"--invitation-neutral-soft": alpha(theme.palette.text.secondary, 0.16),
		"--invitation-accepted-text": isDarkMode ? theme.palette.success.light : theme.palette.success.dark,
		"--invitation-shadow": isDarkMode ? `0 20px 60px ${alpha(theme.palette.common.black, 0.24)}` : `0 20px 48px ${alpha(theme.palette.grey[700], 0.12)}`,
	};
};

const getPageBaseStyles = (theme: Theme) => ({
	...getInvitationThemeVars(theme),
	minHeight: "100%",
	color: "var(--invitation-primary-text)",
});

export const InvitationPageRoot = styled("main")(({ theme }) => ({
	...getPageBaseStyles(theme),
	overflow: "auto",
	padding: theme.spacing(3),
	[theme.breakpoints.down("sm")]: {
		padding: theme.spacing(2),
	},
}));

export const InvitationEmptyPageRoot = styled("div")(({ theme }) => ({
	...getPageBaseStyles(theme),
	display: "grid",
	placeItems: "center",
	padding: theme.spacing(3),
	[theme.breakpoints.down("sm")]: {
		padding: theme.spacing(2),
	},
}));

export const InvitationPanel = styled("section")({
	border: "1px solid var(--invitation-panel-border)",
	borderRadius: 20,
	background: "var(--invitation-panel-bg)",
	boxShadow: "var(--invitation-shadow)",
	backdropFilter: "blur(10px)",
});

export const InvitationSubmitButton = styled(Button)(({ theme }) => ({
	minHeight: 64,
	borderRadius: 14,
	fontSize: "1.05rem",
	fontWeight: 800,
	textTransform: "none",
	background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
	boxShadow: `0 16px 36px ${alpha(theme.palette.primary.dark, 0.22)}`,
	transition: theme.transitions.create(["background", "box-shadow", "transform"], {
		duration: theme.transitions.duration.shorter,
		easing: theme.transitions.easing.easeOut,
	}),
	"& .MuiButton-startIcon": {
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shorter,
			easing: theme.transitions.easing.easeOut,
		}),
	},
	"&:hover": {
		background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
		boxShadow: `0 18px 40px ${alpha(theme.palette.primary.dark, 0.3)}`,
		transform: "translateY(-2px)",
		"& .MuiButton-startIcon": {
			transform: "translateX(3px)",
		},
	},
	"@media (prefers-reduced-motion: reduce)": {
		transition: "none",
		"& .MuiButton-startIcon": {
			transition: "none",
		},
		"&:hover": {
			transform: "none",
			"& .MuiButton-startIcon": {
				transform: "none",
			},
		},
	},
}));
