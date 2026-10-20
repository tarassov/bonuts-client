import { alpha, styled } from "@mui/material/styles";

const forwardHighlight = { shouldForwardProp: (prop: PropertyKey) => prop !== "isHighlighted" };

export const StatTiles = styled("div")(({ theme }) => ({
	display: "grid",
	gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
	gap: theme.spacing(1.5),
}));

export const StatTile = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(0.5),
	padding: theme.spacing(1.75, 2),
	borderRadius: 16,
	border: `1px solid ${theme.palette.inverse.light}`,
	backgroundColor: alpha(theme.palette.inverse.contrastText, 0.05),
}));

export const StatsInline = styled("div")(({ theme }) => ({
	display: "flex",
	flexWrap: "wrap",
	gap: theme.spacing(2, 3.5),
}));

export const StatInline = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "baseline",
	gap: theme.spacing(1),
}));

export const StatValue = styled(
	"span",
	forwardHighlight
)<{ isHighlighted?: boolean }>(({ theme, isHighlighted }) => ({
	fontSize: 28,
	fontWeight: 800,
	letterSpacing: "-0.03em",
	lineHeight: 1,
	color: isHighlighted ? theme.palette.primary.veryLight : theme.palette.inverse.contrastText,
}));

export const StatLabel = styled("span")(({ theme }) => ({
	maxWidth: "18ch",
	fontSize: 13,
	lineHeight: 1.4,
	color: theme.palette.inverse.veryLight,
}));
