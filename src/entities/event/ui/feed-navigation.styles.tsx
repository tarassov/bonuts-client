import { Fab } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FeedMonthHeading = styled("h2")(({ theme }) => ({
	"--feed-month-line-color": theme.palette.mode === "dark" ? theme.palette.divider : "#E5E7EB",
	"--feed-month-dot-color": theme.palette.mode === "dark" ? theme.palette.neutral.main : "#D1D5DB",
}));

export const BackToTopButton = styled(Fab)(({ theme }) => ({
	width: 40,
	height: 40,
	minHeight: 40,
	opacity: 0.8,
	pointerEvents: "auto",
	"&:focus-visible": { outline: `3px solid ${theme.palette.text.primary}`, outlineOffset: 3 },
}));
