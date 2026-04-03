import { alpha, styled } from "@mui/material/styles";

import { EVENT_CARD_CLASSES } from "./classes";
import { EventCard, EventCardProps } from "./event-card";
import { cl } from "themes/helper";

const iconFontSize = "16px";

type TEventCardStyledProps = EventCardProps & {
	bodyMaxHeight?: string | number;
	maxWidth?: string | number;
};

export const EventCardStyled = styled(EventCard, {
	shouldForwardProp: (prop) => prop !== "bodyMaxHeight" && prop !== "maxWidth",
})<TEventCardStyledProps>(({ theme, bodyMaxHeight = 300, maxWidth = 700, post }) => {
	const isNotification = !post.public;

	return {
		width: "100%",
		backgroundColor: isNotification ? "transparent" : theme.palette.background.paper,
		color: theme.palette.getContrastText(theme.palette.background.default),
		maxWidth,
		borderRadius: 16,
		boxShadow: "0 8px 24px rgba(30,31,37,0.06)",
		transition: theme.transitions.create(["width", "margin", "transform", "box-shadow"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		"&:hover": {
			transform: "translateY(-2px)",
			boxShadow: "0 14px 34px rgba(30,31,37,0.12)",
		},
		[cl(EVENT_CARD_CLASSES.cardRoot)]: {
			borderRadius: 16,
			overflow: "hidden",
		},
		[cl(EVENT_CARD_CLASSES.cardContent)]: {
			maxHeight: bodyMaxHeight,
			overflow: "auto",
			padding: theme.spacing(2, 2.5, 1.5),
		},
		[cl(EVENT_CARD_CLASSES.cardEditForm)]: {
			"& .MuiTextField-root": {
				margin: theme.spacing(1),
				width: "90%",
			},
		},
		...(isNotification
			? {
					background: `linear-gradient(180deg, ${alpha(theme.palette.accent.main, 0.14)} 0%, ${alpha(theme.palette.accent.main, 0.05)} 58%, ${theme.palette.common.white} 100%)`,
					border: `1px solid ${alpha(theme.palette.accent.main, 0.18)}`,
				}
			: null),
		[cl(EVENT_CARD_CLASSES.iconCaption)]: {
			minWidth: "10px",
			fontSize: iconFontSize,
			fontWeight: 600,
			color: theme.palette.neutral.dark,
			opacity: 0.72,
		},
		[cl(EVENT_CARD_CLASSES.cardActions)]: {
			display: "flex",
			alignItems: "center",
			gap: theme.spacing(1.5),
			padding: theme.spacing(0, 2.5, 2),
			marginRight: 0,
		},
		[cl(EVENT_CARD_CLASSES.cardDateCaption)]: {
			marginLeft: "auto",
			color: theme.palette.neutral.dark,
			opacity: 0.72,
		},
		[cl(EVENT_CARD_CLASSES.cardActionGroup)]: {
			display: "inline-flex",
			alignItems: "center",
			gap: theme.spacing(0.75),
		},
		[cl(EVENT_CARD_CLASSES.cardActionButton)]: {
			padding: 6,
			color: theme.palette.neutral.dark,
			opacity: 0.72,
			transition: theme.transitions.create(["color", "opacity", "background-color"]),
			"&:hover": {
				color: theme.palette.primary.main,
				opacity: 1,
			},
		},
		[cl(EVENT_CARD_CLASSES.cardBodyText)]: {
			maxWidth: "46ch",
			lineHeight: 1.7,
			color: theme.palette.text.primary,
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
