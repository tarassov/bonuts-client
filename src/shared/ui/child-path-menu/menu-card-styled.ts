import { alpha, styled } from "@mui/material/styles";

import { MENU_CARD_CLASSES } from "./classes";
import { MenuCardPure } from "./menu-card-pure";
import { cl } from "@/themes/helper";

export const MenuCardStyled = styled(
	MenuCardPure,
	{}
)(({ theme }) => {
	const isDarkMode = theme.palette.mode === "dark";
	const cardBackground = isDarkMode ? theme.palette.background.paper : theme.palette.primary.light;
	const hoverBackground = isDarkMode ? alpha(theme.palette.primary.main, 0.12) : theme.palette.primary.light;
	const iconColor = isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark;

	return {
		backgroundColor: cardBackground,
		border: `1px solid ${isDarkMode ? alpha(theme.palette.primary.light, 0.24) : alpha(theme.palette.primary.main, 0.18)}`,
		color: theme.palette.text.primary,
		maxWidth: 250,
		height: 150,
		verticalAlign: "middle",
		margin: "auto",
		textAlign: "center",
		// transition: theme.transitions.create(["width", "margin"], {
		// 	easing: theme.transitions.easing.sharp,
		// 	duration: theme.transitions.duration.leavingScreen,
		// }),
		"& svg": {
			width: "50px",
			height: "50px",
			color: iconColor,
		},
		"&:hover": {
			backgroundColor: hoverBackground,
			outline: "2px solid",
			outlineColor: isDarkMode ? theme.palette.primary.light : theme.palette.primary.main,
			// transform: "translate3d(0, -2px, 10px)",
			// transition: "all 400ms cubic-bezier(0.34, 1.61, 0.7, 1)",
			"& svg": {
				transform: "translate3d(0, -20px, 10px)",
				transition: "all 400ms cubic-bezier(0.34, 1.61, 0.7, 1)",
			},
		},
		[cl(MENU_CARD_CLASSES.cardBody)]: {
			minHeight: 200,
		},
		[cl(MENU_CARD_CLASSES.cardHeader)]: {
			paddingTop: "20px",
			height: "80px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		[cl(MENU_CARD_CLASSES.cardTitle)]: {
			color: theme.palette.text.primary,
		},
	};
});
