import { styled } from "@mui/material/styles";
import { MenuCardPure } from "components/child-path/menu-card/menu-card-pure";
import { cl } from "themes/helper";
import { MENU_CARD_CLASSES } from "components/child-path/menu-card/classes";

export const MenuCardStyled = styled(
	MenuCardPure,
	{}
)(({ theme }) => {
	return {
		backgroundColor: theme.palette.primary.light,
		maxWidth: 250,
		height: 150,
		verticalAlign: "middle",
		margin: "auto",
		textAlign: "center",
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		"& svg": {
			width: "50px",
			height: "50px",
		},
		"&:hover": {
			transform: "translate3d(0, -2px, 10px)",
			transition: "all 400ms cubic-bezier(0.34, 1.61, 0.7, 1)",
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
	};
});
