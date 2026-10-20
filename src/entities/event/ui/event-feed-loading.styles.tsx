import { Typography } from "@mui/material";
import { alpha, keyframes, styled } from "@mui/material/styles";

import { FEED_CARD_ENTER_DELAY_MS, FEED_CARD_STAGGER_MS, FEED_DONUT_STAGGER_MS, FEED_LOADER_EXIT_MS } from "../config/feed-motion";

const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";
const BOUNCE_EASING = "cubic-bezier(.45,0,.55,1)";

const bounce = keyframes`
	0%, 100% { transform: translateY(0) rotate(0); }
	50% { transform: translateY(-16px) rotate(180deg); }
`;

const shadowPulse = keyframes`
	0%, 100% { transform: scaleX(1); opacity: .35; }
	50% { transform: scaleX(.5); opacity: .12; }
`;

const breathe = keyframes`
	0%, 100% { opacity: .55; }
	50% { opacity: 1; }
`;

const leave = keyframes`
	to { opacity: 0; transform: translateY(-24px); }
`;

const spin = keyframes`
	to { transform: rotate(360deg); }
`;

const dropIn = keyframes`
	from { opacity: 0; transform: translateY(-26px) scale(.97); }
	60% { transform: translateY(4px) scale(1); }
	to { opacity: 1; transform: none; }
`;

// Sits in the feed column where the first card will land. While leaving it floats above the arriving cards.
export const FeedLoadingRoot = styled("div", {
	shouldForwardProp: (prop) => prop !== "isLeaving",
})<{ isLeaving: boolean }>(({ theme, isLeaving }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: theme.spacing(2.75),
	width: "100%",
	paddingTop: 120,
	[theme.breakpoints.up("md")]: {
		gap: theme.spacing(3),
		paddingTop: 96,
	},
	...(isLeaving
		? {
				position: "absolute",
				top: 0,
				left: 0,
				pointerEvents: "none",
				animation: `${leave} ${FEED_LOADER_EXIT_MS}ms ease-in both`,
			}
		: null),
	[REDUCED_MOTION]: {
		animation: "none",
		opacity: isLeaving ? 0 : 1,
	},
}));

export const FeedLoadingDonuts = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "flex-end",
	gap: theme.spacing(2.75),
	[theme.breakpoints.up("md")]: {
		gap: theme.spacing(3.25),
	},
}));

export const FeedLoadingDonut = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: theme.spacing(1.25),
	[theme.breakpoints.up("md")]: {
		gap: theme.spacing(1.5),
	},
}));

// A glazed ring with three sprinkles; the hole shows the page background.
export const FeedLoadingRing = styled("div", {
	shouldForwardProp: (prop) => prop !== "index",
})<{ index: number }>(({ theme, index }) => ({
	position: "relative",
	width: 34,
	height: 34,
	borderRadius: "50%",
	background: `radial-gradient(circle, ${theme.palette.background.default} 0 34%, transparent 35%), conic-gradient(from 0deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light}, ${theme.palette.primary.main})`,
	animation: `${bounce} 1.1s ${BOUNCE_EASING} infinite`,
	animationDelay: `${index * FEED_DONUT_STAGGER_MS}ms`,
	[theme.breakpoints.up("md")]: {
		width: 40,
		height: 40,
	},
	"& > span": {
		position: "absolute",
		width: "15%",
		height: 2,
		borderRadius: 1,
		backgroundColor: theme.palette.common.white,
	},
	"& > span:nth-of-type(1)": {
		top: "18%",
		left: "44%",
		transform: "rotate(30deg)",
	},
	"& > span:nth-of-type(2)": {
		top: "65%",
		left: "18%",
		transform: "rotate(-40deg)",
		backgroundColor: theme.palette.accent.main,
	},
	"& > span:nth-of-type(3)": {
		top: "70%",
		left: "70%",
		transform: "rotate(70deg)",
	},
	[REDUCED_MOTION]: {
		animation: "none",
	},
}));

export const FeedLoadingShadow = styled("div", {
	shouldForwardProp: (prop) => prop !== "index",
})<{ index: number }>(({ theme, index }) => ({
	width: 26,
	height: 5,
	borderRadius: "50%",
	backgroundColor: theme.palette.primary.main,
	opacity: 0.35,
	animation: `${shadowPulse} 1.1s ${BOUNCE_EASING} infinite`,
	animationDelay: `${index * FEED_DONUT_STAGGER_MS}ms`,
	[theme.breakpoints.up("md")]: {
		width: 30,
		height: 6,
	},
	[REDUCED_MOTION]: {
		animation: "none",
	},
}));

export const FeedLoadingCaption = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
	animation: `${breathe} 1.6s ease-in-out infinite`,
	[REDUCED_MOTION]: {
		animation: "none",
	},
}));

// Wraps a freshly loaded card: it drops from above and lands softly, one after another.
export const FeedCardEntrance = styled("div", {
	shouldForwardProp: (prop) => prop !== "index" && prop !== "isAnimated",
})<{ index: number; isAnimated: boolean }>(({ index, isAnimated }) => ({
	display: "flex",
	justifyContent: "center",
	width: "100%",
	...(isAnimated
		? {
				animation: `${dropIn} .6s cubic-bezier(.3,.8,.3,1) both`,
				animationDelay: `${FEED_CARD_ENTER_DELAY_MS + index * FEED_CARD_STAGGER_MS}ms`,
			}
		: null),
	[REDUCED_MOTION]: {
		animation: "none",
	},
}));

// A single bitten donut spinning at the bottom of the feed while the next page loads.
export const FeedDonutSpinner = styled("div")(({ theme }) => ({
	width: 30,
	height: 30,
	borderRadius: "50%",
	background: `radial-gradient(circle, ${theme.palette.background.default} 0 33%, transparent 34%), conic-gradient(${theme.palette.primary.main} 0 290deg, ${theme.palette.primary.light} 290deg 360deg)`,
	boxShadow: `0 6px 14px ${alpha(theme.palette.primary.main, 0.25)}`,
	animation: `${spin} 1s linear infinite`,
	[REDUCED_MOTION]: {
		animation: "none",
	},
}));
