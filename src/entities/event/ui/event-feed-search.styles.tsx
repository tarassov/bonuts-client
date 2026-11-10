import { IconButton, styled } from "@mui/material";

import { BntTextInput } from "@/shared/ui/input";

export const FeedSearchRoot = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	minWidth: 0,
});

export const FeedSearchInput = styled(BntTextInput)(({ theme }) => ({
	minWidth: 0,
	width: "100%",
	maxWidth: 240,
	"& .MuiInputBase-root": {
		height: 40,
		padding: theme.spacing(0, 1),
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: 10,
		fontSize: 14,
	},
	[theme.breakpoints.down("sm")]: { maxWidth: "none" },
}));

export const FeedSearchButton = styled(IconButton)(({ theme }) => ({
	width: 40,
	height: 40,
	borderRadius: 10,
	flexShrink: 0,
	color: theme.palette.text.secondary,
}));
