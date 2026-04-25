import { alpha, styled } from "@mui/material/styles";

import { BntButton } from "@/shared/ui/buttons";
import { BntCard, BntCardActionArea, BntCardBody } from "@/shared/ui/card";
import { BntTypography } from "@/shared/ui/typography";

export const EmployeeCardRoot = styled(BntCard)(({ theme }) => {
	const isDarkMode = theme.palette.mode === "dark";

	return {
		backgroundColor: isDarkMode ? theme.palette.background.paper : theme.palette.secondary.veryLight,
		maxWidth: 300,
		color: theme.palette.text.heading,
		margin: "auto",
		border: `1px solid ${theme.palette.divider}`,
		transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background-color 220ms ease",
		"&:hover": {
			outline: "2px solid",
			outlineColor: isDarkMode ? theme.palette.primary.main : theme.palette.primary.light,
			borderColor: isDarkMode ? alpha(theme.palette.primary.light, 0.7) : theme.palette.primary.light,
			backgroundColor: isDarkMode ? alpha(theme.palette.primary.main, 0.08) : theme.palette.secondary.veryLight,
			boxShadow: isDarkMode ? "0 14px 30px rgba(0, 0, 0, 0.45)" : "0 14px 28px rgba(0, 0, 0, 0.12)",
			transform: "translateY(-3px)",
		},
	};
});

export const EmployeeCardActionArea = styled(BntCardActionArea)({
	width: "100%",
});

export const EmployeeCardBody = styled(BntCardBody)({
	display: "flex",
	justifyContent: "center",
	minHeight: 200,
	padding: "16px 24px 20px",
});

export const EmployeeCardAvatar = styled("img")(({ theme }) => {
	const isDarkMode = theme.palette.mode === "dark";

	return {
		width: "auto",
		height: "auto",
		maxHeight: "160px",
		maxWidth: "100%",
		verticalAlign: "middle",
		margin: "0 auto",
		border: 0,
		boxShadow: isDarkMode ? "0px 0px 28px rgba(255, 176, 102, 0.28)" : "0px 0px 48px rgba(255, 255, 255, 0.8)",
		transition: "transform 500ms cubic-bezier(0.34, 1.61, 0.7, 1)",
		[theme.breakpoints.down("sm")]: {
			maxHeight: "90px",
		},
		[`${EmployeeCardRoot}:hover &`]: {
			transform: "translate3d(0, -3px, 2px)",
		},
	};
});

export const EmployeeCardCaption = styled("div")({
	display: "flex",
	flexDirection: "column",
	gap: "10px",
	alignItems: "center",
	width: "100%",
});

export const EmployeeName = styled(BntTypography)(({ theme }) => ({
	fontWeight: 600,
	color: theme.palette.text.primary,
	textAlign: "center",
}));

export const EmployeeCardFooter = styled("div")({
	display: "flex",
	justifyContent: "center",
	width: "100%",
	paddingTop: 2,
});

export const EmployeeTransferButton = styled(BntButton)(({ theme }) => {
	const isDarkMode = theme.palette.mode === "dark";

	return {
		minHeight: 36,
		padding: "6px 14px",
		borderRadius: 10,
		textTransform: "none",
		fontWeight: 500,
		border: `1px solid ${isDarkMode ? alpha(theme.palette.primary.light, 0.75) : alpha(theme.palette.primary.main, 0.55)}`,
		backgroundColor: alpha(theme.palette.primary.main, 0.18),
		color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark,
		transition: "background-color 180ms ease, border-color 180ms ease, color 180ms ease",
		"&:hover": {
			backgroundColor: isDarkMode ? alpha(theme.palette.primary.main, 0.28) : alpha(theme.palette.primary.light, 0.2),
			borderColor: isDarkMode ? theme.palette.primary.main : theme.palette.primary.main,
			color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark,
		},
		[`${EmployeeCardRoot}:hover &`]: {
			backgroundColor: isDarkMode ? alpha(theme.palette.primary.main, 0.26) : alpha(theme.palette.primary.light, 0.2),
			borderColor: isDarkMode ? theme.palette.primary.main : theme.palette.primary.main,
			color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark,
		},
		"& .MuiButton-startIcon": {
			marginRight: 4,
		},
		"& .MuiSvgIcon-root": {
			fontSize: 18,
		},
	};
});
