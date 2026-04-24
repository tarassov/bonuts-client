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
	const notificationSurface = theme.palette.mode === "dark" ? alpha(theme.palette.background.paper, 0.6) : alpha(theme.palette.background.paper, 0.95);
	const notificationBorder = alpha(theme.palette.divider, theme.palette.mode === "dark" ? 0.7 : 0.85);
	const cardBoxShadow = isNotification ? "none" : "0 8px 24px rgba(30,31,37,0.06)";
	const cardHoverTransform = isNotification ? "none" : "translateY(-2px)";
	const cardHoverShadow = isNotification ? "none" : "0 14px 34px rgba(30,31,37,0.12)";

	return {
		width: "100%",
		backgroundColor: isNotification ? "transparent" : theme.palette.background.paper,
		color: theme.palette.getContrastText(theme.palette.background.default),
		maxWidth,
		borderRadius: 16,
		boxShadow: cardBoxShadow,
		transition: theme.transitions.create(["width", "margin", "transform", "box-shadow"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		"&:hover": {
			transform: cardHoverTransform,
			boxShadow: cardHoverShadow,
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
					background: `linear-gradient(180deg, ${alpha(theme.palette.accent.main, theme.palette.mode === "dark" ? 0.08 : 0.06)} 0%, ${alpha(theme.palette.accent.main, theme.palette.mode === "dark" ? 0.03 : 0.02)} 52%, ${notificationSurface} 100%)`,
					border: `1px solid ${notificationBorder}`,
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
				color: theme.palette.primary.light,
				opacity: 1,
			},
		},
		[cl(EVENT_CARD_CLASSES.liked)]: {
			color: theme.palette.primary.main,
			opacity: 1,
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
