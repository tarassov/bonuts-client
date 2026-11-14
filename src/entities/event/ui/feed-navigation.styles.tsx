import { Fab } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const DayMarker = styled("div")(({ theme }) => ({
	position: "relative",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	padding: theme.spacing(1, 0),
	marginBottom: theme.spacing(2),
	"&::before": { content: '""', position: "absolute", width: "100%", borderTop: `1px solid ${theme.palette.divider}` },
}));

export const DayLabel = styled("span", { shouldForwardProp: (prop) => prop !== "isToday" })<{ isToday: boolean }>(({ theme, isToday }) => ({
	position: "relative",
	display: "inline-flex",
	alignItems: "center",
	gap: theme.spacing(0.75),
	padding: theme.spacing(0.5, 1.75),
	borderRadius: 999,
	border: `1px solid ${theme.palette.divider}`,
	background: isToday ? alpha(theme.palette.background.paper, 0.85) : theme.palette.background.paper,
	color: theme.palette.text.secondary,
	fontSize: theme.typography.caption.fontSize,
	lineHeight: "18px",
	fontWeight: 500,
	...(isToday ? { "&::before": { content: '""', width: 7, height: 7, borderRadius: "50%", background: alpha(theme.palette.primary.main, 0.65) } } : {}),
}));

export const BackToTopButton = styled(Fab)(({ theme }) => ({
	width: 40,
	height: 40,
	minHeight: 40,
	opacity: 0.8,
	pointerEvents: "auto",
	"&:focus-visible": { outline: `3px solid ${theme.palette.text.primary}`, outlineOffset: 3 },
}));
