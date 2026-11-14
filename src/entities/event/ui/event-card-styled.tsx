import { alpha, styled } from "@mui/material/styles";

import { present } from "@/shared/lib/type-guards";

import { EVENT_CARD_CLASSES } from "./classes";
import type { EventCardProps } from "./event-card";
import { EventCard } from "./event-card";
import { cl } from "@/themes/helper";

const iconFontSize = "13px";

type TEventCardStyledProps = EventCardProps & {
	bodyMaxHeight?: string | number;
	maxWidth?: string | number;
};

export const EventCardStyled = styled(EventCard, {
	shouldForwardProp: (prop) => prop !== "bodyMaxHeight" && prop !== "maxWidth",
})<TEventCardStyledProps>(({ theme, bodyMaxHeight = 300, maxWidth = 700, post }) => {
	const isNotification = !post.public;
	const hasImages = present(post.images);

	return {
		container: "event-card / inline-size",
		width: "100%",
		backgroundColor: isNotification ? alpha(theme.palette.accent.main, 0.05) : theme.palette.background.paper,
		border: `1px solid ${theme.palette.divider}`,
		color: theme.palette.text.primary,
		maxWidth,
		borderRadius: 16,
		boxShadow: isNotification ? "none" : "0 2px 10px rgba(0,0,0,0.04)",
		transition: theme.transitions.create(["border-color", "box-shadow"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		"@media (hover: hover)": {
			"&:hover": {
				borderColor: alpha(theme.palette.primary.main, 0.3),
			},
		},
		[cl(EVENT_CARD_CLASSES.cardRoot)]: {
			borderRadius: 16,
			overflow: "hidden",
		},
		[cl(EVENT_CARD_CLASSES.cardContent)]: {
			maxHeight: hasImages ? "none" : bodyMaxHeight,
			overflow: hasImages ? "visible" : "auto",
			padding: theme.spacing(1.5, 2, 2),
			[theme.breakpoints.up("sm")]: { padding: theme.spacing(1.5, 2.5, 2) },
			// on touch screens a nested scroller captures the tap and slides the recognition line
			// away under the finger, so the card simply grows with its text
			[theme.breakpoints.down("md")]: {
				maxHeight: "none",
				overflow: "visible",
			},
		},
		[cl(EVENT_CARD_CLASSES.cardEditForm)]: {
			"& .MuiTextField-root": {
				margin: theme.spacing(1),
				width: "90%",
			},
		},
		[cl(EVENT_CARD_CLASSES.iconCaption)]: {
			minWidth: "10px",
			fontSize: iconFontSize,
			fontWeight: 600,
			color: theme.palette.text.secondary,
		},
		[cl(EVENT_CARD_CLASSES.cardActions)]: {
			display: "flex",
			alignItems: "center",
			flexWrap: "wrap",
			gap: theme.spacing(0.75),
			padding: theme.spacing(1, 2, 1.5),
			borderTop: `1px solid ${theme.palette.divider}`,
			[theme.breakpoints.up("sm")]: { padding: theme.spacing(1, 2.5, 1.5) },
			marginRight: 0,
		},
		[cl(EVENT_CARD_CLASSES.cardDateCaption)]: {
			marginLeft: "auto",
			color: theme.palette.text.secondary,
		},
		[cl(EVENT_CARD_CLASSES.cardActionGroup)]: {
			display: "inline-flex",
			alignItems: "center",
			gap: theme.spacing(0.75),
		},
		[cl(EVENT_CARD_CLASSES.cardActionButton)]: {
			minWidth: 40,
			minHeight: 40,
			padding: theme.spacing(0.75, 1),
			gap: theme.spacing(0.75),
			borderRadius: 20,
			backgroundColor: theme.palette.action.hover,
			"& svg": { fontSize: 18 },
			color: theme.palette.text.secondary,
			transition: theme.transitions.create(["color", "opacity", "background-color"]),
			"&:hover": {
				color: theme.palette.primary.dark,
				opacity: 1,
			},
		},
		[cl(EVENT_CARD_CLASSES.liked)]: {
			color: theme.palette.primary.dark,
			backgroundColor: alpha(theme.palette.primary.main, 0.1),
			"& .icon-caption": { color: "inherit" },
			"&:hover": {
				color: theme.palette.primary.main,
				opacity: 1,
			},
		},
		[cl(EVENT_CARD_CLASSES.cardBodyText)]: {
			overflowWrap: "anywhere",
			lineHeight: 1.65,
			color: theme.palette.text.primary,
		},
		"@media (prefers-reduced-motion: reduce)": { transition: "none" },
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
