import { styled } from "@mui/material/styles";
import { cl } from "themes/helper";
import { DONUT_CARD_CLASSES } from "components/donut/donut-card/classes";
import { DonutCardComponent } from "./donut-card-component";
import { bounceStyle } from "../../styles/bounce-style";

export const DonutCard = styled(
	DonutCardComponent,
	{}
)(({ theme }) => {
	return {
		backgroundColor: theme.palette.background.paper,
		maxWidth: 700,
		color: theme.palette.neutral.dark,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		"&:hover": {
			...bounceStyle(),
			margin: "5px",
		},
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
