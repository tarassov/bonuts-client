import { alpha, styled } from "@mui/material/styles";

import { ChestMode } from "../model/chest-mode";

import { captionIn, cardDrop, cardRise, chestShake, glowIn, glowOut, lidClose, lidOpen, lockPop, overlayFade } from "./chest-animation.keyframes";

/** The motion takes about 3.4s; the last second keeps the closed (or opened) box on screen. */
export const CHEST_ANIMATION_MS = 4400;

const DURATION = `${CHEST_ANIMATION_MS}ms`;
const EASE_OUT = "cubic-bezier(.3,.7,.2,1)";

type TModeProps = { mode: ChestMode };
const forwardMode = { shouldForwardProp: (prop: PropertyKey) => prop !== "mode" };
const isOpen = (mode: ChestMode): boolean => mode === ChestMode.Open;

export const ChestOverlay = styled("div")(({ theme }) => ({
	position: "fixed",
	inset: 0,
	zIndex: theme.zIndex.modal + 1,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: alpha(theme.palette.inverse.main, 0.62),
	animation: `${overlayFade} ${DURATION} ease forwards`,
	cursor: "pointer",
	"@media (prefers-reduced-motion: reduce)": {
		"&, & *": { animationDuration: "1ms !important", animationDelay: "0ms !important" },
	},
}));

export const ChestScene = styled("div")({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: 28,
});

export const ChestStage = styled("div")({
	position: "relative",
	width: 340,
	maxWidth: "calc(100vw - 32px)",
	height: 330,
});

export const ChestGlow = styled(
	"div",
	forwardMode
)<TModeProps>(({ theme, mode }) => ({
	position: "absolute",
	left: "50%",
	bottom: 30,
	width: 320,
	height: 320,
	borderRadius: "50%",
	background: `radial-gradient(closest-side, ${alpha(theme.palette.primary.main, 0.55)}, ${alpha(theme.palette.primary.veryLight ?? theme.palette.primary.main, 0.18)} 55%, transparent)`,
	animation: `${isOpen(mode) ? glowIn : glowOut} ${DURATION} ease forwards`,
}));

export const ChestCard = styled(
	"div",
	forwardMode
)<TModeProps>(({ theme, mode }) => ({
	position: "absolute",
	left: "50%",
	bottom: isOpen(mode) ? 120 : 110,
	// above the lid in both modes: the question stays readable over the open lid and fades as the lid closes
	zIndex: 4,
	width: 290,
	maxWidth: "calc(100vw - 48px)",
	boxSizing: "border-box",
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(1),
	padding: theme.spacing(1.75, 2),
	borderRadius: 16,
	backgroundColor: theme.palette.background.paper,
	boxShadow: `0 14px 34px ${alpha(theme.palette.inverse.main, 0.24)}`,
	opacity: 0,
	animation: `${isOpen(mode) ? cardRise : cardDrop} ${DURATION} ${EASE_OUT} forwards`,
}));

export const ChestCardLabel = styled(
	"div",
	forwardMode
)<TModeProps>(({ theme, mode }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(0.75),
	fontSize: 12,
	fontWeight: 700,
	color: isOpen(mode) ? theme.palette.success.main : theme.palette.text.secondary,
	"& svg": { fontSize: 16 },
}));

export const ChestCardText = styled("div")(({ theme }) => ({
	display: "-webkit-box",
	WebkitLineClamp: 3,
	WebkitBoxOrient: "vertical",
	overflow: "hidden",
	fontSize: 14,
	lineHeight: 1.5,
	color: theme.palette.text.primary,
}));

export const ChestBox = styled(
	"div",
	forwardMode
)<TModeProps>(({ mode }) => ({
	position: "absolute",
	left: "50%",
	bottom: 0,
	width: 220,
	marginLeft: -110,
	zIndex: 2,
	animation: `${chestShake} 0.7s ease ${isOpen(mode) ? "0.15s" : "2.1s"}`,
}));

export const ChestLid = styled(
	"div",
	forwardMode
)<TModeProps>(({ theme, mode }) => ({
	position: "relative",
	zIndex: 3,
	height: 60,
	transformOrigin: "50% 0%",
	borderRadius: "22px 22px 6px 6px",
	border: `1px solid ${theme.palette.inverse.light}`,
	background: `linear-gradient(180deg, ${theme.palette.inverse.light}, ${theme.palette.inverse.main})`,
	boxShadow: `inset 0 1px 0 ${alpha(theme.palette.inverse.contrastText, 0.08)}`,
	animation: `${isOpen(mode) ? lidOpen : lidClose} ${DURATION} ${EASE_OUT} forwards`,
	"&::after": {
		content: '""',
		position: "absolute",
		left: 16,
		right: 16,
		bottom: 10,
		height: 2,
		borderRadius: 2,
		backgroundColor: alpha(theme.palette.primary.main, 0.5),
	},
}));

export const ChestBody = styled("div")(({ theme }) => ({
	position: "relative",
	display: "flex",
	justifyContent: "center",
	height: 120,
	marginTop: -2,
	borderRadius: "6px 6px 22px 22px",
	border: `1px solid ${theme.palette.inverse.light}`,
	background: `linear-gradient(180deg, ${theme.palette.inverse.main}, ${theme.palette.inverse.dark})`,
	boxShadow: `0 24px 48px ${alpha(theme.palette.common.black, 0.4)}`,
}));

export const ChestLock = styled(
	"div",
	forwardMode
)<TModeProps>(({ theme, mode }) => ({
	position: "relative",
	zIndex: 5,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: 44,
	height: 44,
	marginTop: -22,
	borderRadius: 14,
	color: theme.palette.primary.contrastText,
	background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
	boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.45)}`,
	animation: isOpen(mode) ? "none" : `${lockPop} ${DURATION} ease forwards`,
	"& svg": { fontSize: 24 },
}));

export const ChestCaption = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: theme.spacing(0.75),
	paddingInline: theme.spacing(2),
	textAlign: "center",
	opacity: 0,
	animation: `${captionIn} ${DURATION} ease forwards`,
}));

export const ChestTitle = styled("div")(({ theme }) => ({
	fontSize: 24,
	fontWeight: 800,
	letterSpacing: "-0.03em",
	color: theme.palette.inverse.contrastText,
}));

export const ChestSubtitle = styled("div")(({ theme }) => ({
	fontSize: 14,
	color: theme.palette.inverse.veryLight,
}));
