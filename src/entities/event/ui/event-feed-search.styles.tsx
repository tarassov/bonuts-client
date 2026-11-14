import { IconButton, styled } from "@mui/material";

import { BntTextInput } from "@/shared/ui/input";

type TFeedSearchExpandedProps = { isExpanded: boolean };

export const FeedSearchRoot = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	minWidth: 0,
	gridColumn: "var(--feed-search-column, auto)",
});

export const FeedSearchInput = styled(BntTextInput, {
	shouldForwardProp: (prop) => prop !== "isExpanded",
})<TFeedSearchExpandedProps>(({ theme, isExpanded }) => ({
	display: `var(--feed-search-input-display, ${isExpanded ? "inline-flex" : "none"})`,
	minWidth: 0,
	width: "100%",
	maxWidth: "var(--feed-search-max-width, 240px)",
	"& .MuiInputBase-root": {
		height: 40,
		padding: theme.spacing(0, 1),
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: 10,
		backgroundColor: theme.palette.action.hover,
		fontSize: 13,
		"&.Mui-focused": { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: -2 },
	},
}));

export const FeedSearchButton = styled(IconButton)(({ theme }) => ({
	width: 40,
	height: 40,
	borderRadius: 10,
	flexShrink: 0,
	color: theme.palette.text.secondary,
}));

export const FeedSearchOpenButton = styled(FeedSearchButton, {
	shouldForwardProp: (prop) => prop !== "isExpanded",
})<TFeedSearchExpandedProps>(({ isExpanded }) => ({
	display: `var(--feed-search-button-display, ${isExpanded ? "none" : "inline-flex"})`,
}));
