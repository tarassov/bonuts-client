import { styled } from "@mui/material/styles";

import { DONUT_CARD_CLASSES } from "./classes";
import { DonutCardPure } from "./donut-card-pure";
import { cl } from "@/themes/helper";

export const DonutCardStyled = styled(
	DonutCardPure,
	{}
)(({ theme }) => {
	const isDarkMode = theme.palette.mode === "dark";

	return {
		backgroundColor: isDarkMode ? theme.palette.background.paper : theme.palette.secondary.veryLight,
		maxWidth: 300,
		color: theme.palette.neutral.dark,
		margin: "auto",
		border: `1px solid ${theme.palette.divider}`,
		"& img": {
			boxShadow: isDarkMode ? "0px 0px 28px rgba(255, 176, 102, 0.28)" : "0px 0px 48px rgba(255, 255, 255, 0.8)",
			maxHeight: "100px",
		},
		"&:hover": {
			outline: "2px solid",
			outlineColor: isDarkMode ? theme.palette.primary.main : theme.palette.primary.light,
			"& img": {
				transform: "translate3d(0, -3px, 2px)",
				transition: "all 500ms cubic-bezier(0.34, 1.61, 0.7, 1)",
			},
		},
		[cl(DONUT_CARD_CLASSES.remains)]: {
			position: "absolute",
			top: "5px",
			right: "5px",
			color: isDarkMode ? theme.palette.error.light : theme.palette.error.main,
			backgroundColor: isDarkMode ? theme.palette.background.default : theme.palette.secondary.light,
			border: `1px solid ${theme.palette.divider}`,
			borderRadius: "3px",
			boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
		},
		[cl(DONUT_CARD_CLASSES.cardBody)]: {
			display: "flex",
			justifyContent: "center",
			minHeight: 200,
		},
		[cl(DONUT_CARD_CLASSES.captions)]: {
			display: "flex",
			flexDirection: "column",
			gap: "12px",
			alignItems: "center",
			textAlign: "center",
		},
		[cl(DONUT_CARD_CLASSES.cardHeaderHover)]: {
			display: "flex",
			flexDirection: "column",
			height: "100%",
			alignItems: "center",
			justifyContent: "center",
		},
	};
});
