import { styled } from "@mui/material/styles";
import { cl } from "themes/helper";
import { EVENT_CARD_CLASSES } from "./classes";
import { BntEventCard } from "./event-card";

const iconFontSize = "16px";

export const BntStyledEventCard = styled(
	BntEventCard,
	{}
)(({ theme }) => {
	return {
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.getContrastText(theme.palette.background.default),
		maxWidth: 700,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		[cl(EVENT_CARD_CLASSES.cardPrivate)]: {
			backgroundColor: theme.palette.info.light,
		},
		[cl(EVENT_CARD_CLASSES.liked)]: {
			color: theme.palette.info.light,
		},
		[cl(EVENT_CARD_CLASSES.iconCaption)]: {
			width: "10px",
			paddingTop: "4px",
			fontSize: iconFontSize,
			color: theme.palette.grey.A700,
		},
		[cl(EVENT_CARD_CLASSES.cardActions)]: {
			display: "flex",
			marginRight: "5px",
		},
		[cl(EVENT_CARD_CLASSES.cardDateCaption)]: {
			marginLeft: "auto",
		},
		[cl(EVENT_CARD_CLASSES.expand)]: {
			transform: "rotate(0deg)",
			transition: theme.transitions.create("transform", {
				duration: theme.transitions.duration.shortest,
			}),
		},
		[cl(EVENT_CARD_CLASSES.expandOpened)]: {
			transform: "rotate(180deg)",
		},
	};
});
