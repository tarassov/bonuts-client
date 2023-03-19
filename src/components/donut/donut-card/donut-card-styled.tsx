import { styled } from "@mui/material/styles";
import { BntDonutCard, DONUT_CARD_CLASSES } from "./donut-card";
import { cl } from "../../../themes/helper";
import { cardHoverStyle } from "../../styles/card-hover-style";
import { bounceStyle, pulsateStyle } from "../../styles/bounce-style";

const iconFontSize = "16px";

export const BntDonutCardStyled = styled(
	BntDonutCard,
	{}
)(({ theme }) => {
	return {
		backgroundColor: theme.palette.background.paper,
		minWidth: 300,
		maxWidth: 500,
		color: theme.palette.neutral.dark,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		"&:hover": { ...bounceStyle(theme), margin: "5px" },
		[cl(DONUT_CARD_CLASSES.cardHover)]: cardHoverStyle(theme).cardHover,
		[cl(DONUT_CARD_CLASSES.remains)]: {
			position: "absolute",
			top: "5px",
			right: "5px",
			color: theme.palette.error.main,
			backgroundColor: theme.palette.secondary.light,
			borderRadius: "3px",
			boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
		},
		[cl(DONUT_CARD_CLASSES.cardBody)]: {
			minHeight: 200,
		},
	};
});
