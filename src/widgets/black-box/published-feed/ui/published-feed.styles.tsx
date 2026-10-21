import { styled } from "@mui/material/styles";

export const FeedHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "flex-end",
	justifyContent: "space-between",
	flexWrap: "wrap",
	gap: theme.spacing(1.5),
	paddingInline: theme.spacing(0.5),
}));

export const FeedTitle = styled("h2")(({ theme }) => ({
	margin: 0,
	fontSize: 24,
	fontWeight: 800,
	letterSpacing: "-0.03em",
	color: theme.palette.text.heading,
}));

export const FeedSubtitle = styled("span")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(0.75),
	fontSize: 13,
	color: theme.palette.text.secondary,
	"& svg": { fontSize: 16 },
}));

export const FeedCount = styled("span")(({ theme }) => ({
	fontSize: 13,
	fontWeight: 700,
	color: theme.palette.text.secondary,
}));

export const EmptyFeed = styled("div")(({ theme }) => ({
	padding: theme.spacing(3),
	borderRadius: 16,
	textAlign: "center",
	fontSize: 14,
	color: theme.palette.text.secondary,
	backgroundColor: theme.palette.action.hover,
}));
