import { alpha, styled } from "@mui/material/styles";

/** The dark "box" surface with the soft orange rings of the design. */
export const HeroRoot = styled("section")(({ theme }) => ({
	position: "relative",
	overflow: "hidden",
	display: "grid",
	gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
	gap: theme.spacing(3),
	alignItems: "end",
	padding: theme.spacing(4),
	borderRadius: 24,
	backgroundColor: theme.palette.inverse.main,
	color: theme.palette.inverse.contrastText,
	"&::before, &::after": {
		content: '""',
		position: "absolute",
		borderRadius: "50%",
		pointerEvents: "none",
	},
	"&::before": {
		right: -80,
		top: -120,
		width: 360,
		height: 360,
		border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
	},
	"&::after": {
		right: -160,
		bottom: -200,
		width: 420,
		height: 420,
		background: `radial-gradient(closest-side, ${alpha(theme.palette.primary.main, 0.16)}, transparent)`,
	},
	[theme.breakpoints.down("sm")]: {
		padding: theme.spacing(3, 2.5),
		borderRadius: 20,
	},
}));

/** The text column stretches to the hero height: the heading on top, the footer (numbers) at the bottom. */
export const HeroText = styled("div")(({ theme }) => ({
	position: "relative",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	alignSelf: "stretch",
	gap: theme.spacing(2),
	minWidth: 0,
}));

export const HeroHeading = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(1.5),
}));

export const HeroAside = styled("div")({
	position: "relative",
	minWidth: 0,
});

/** A translucent block on the dark hero, e.g. the question form. */
export const HeroPanel = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(1.5),
	padding: theme.spacing(2.25),
	borderRadius: 16,
	border: `1px solid ${theme.palette.inverse.light}`,
	backgroundColor: alpha(theme.palette.inverse.contrastText, 0.05),
	color: theme.palette.inverse.contrastText,
}));

export const HeroEyebrow = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(1),
	fontSize: 12,
	fontWeight: 700,
	letterSpacing: "0.08em",
	textTransform: "uppercase",
	color: theme.palette.primary.veryLight,
	"& svg": { fontSize: 18 },
}));

export const HeroTitle = styled("h1")({
	margin: 0,
	fontSize: "clamp(30px, 4.4vw, 52px)",
	fontWeight: 800,
	letterSpacing: "-0.04em",
	lineHeight: 1.05,
});

export const HeroDescription = styled("p")(({ theme }) => ({
	margin: 0,
	maxWidth: "44ch",
	fontSize: 15,
	lineHeight: 1.7,
	color: theme.palette.inverse.veryLight,
}));
