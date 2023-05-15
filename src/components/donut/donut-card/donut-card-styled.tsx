import { styled } from "@mui/material/styles";
import { cl } from "themes/helper";
import { DONUT_CARD_CLASSES } from "components/donut/donut-card/classes";
import { DonutCardPure } from "./donut-card-pure";

export const DonutCardStyled = styled(
	DonutCardPure,
	{}
)(({ theme }) => {
	return {
		backgroundColor: theme.palette.background.paper,
		maxWidth: 300,
		color: theme.palette.neutral.dark,
		margin: "auto",
		"&:hover": {
			outline: "2px solid",
			outlineColor: theme.palette.primary.light,
			"& img": {
				transform: "translate3d(0, -3px, 2px)",
				transition: "all 400ms cubic-bezier(0.34, 1.61, 0.7, 1)",
			},
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
			display: "flex",
			justifyContent: "center",
			minHeight: 200,
		},
		[cl(DONUT_CARD_CLASSES.captions)]: {
			display: "flex",
			flexDirection: "column",
			gap: "12px",
			alignItems: "center",
		},
	};
});
