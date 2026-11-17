import { styled } from "@mui/material";

import { BntButton } from "@/shared/ui/buttons";

export const FeedGiveButton = styled(BntButton)(({ theme }) => ({
	height: 40,
	minWidth: 0,
	padding: theme.spacing(0, 1.5),
	borderRadius: 10,
	fontSize: 14,
	fontWeight: 500,
	textTransform: "none",
	background: theme.palette.primary.dark,
	boxShadow: "none",
	transition: theme.transitions.create("background-color", { duration: 200 }),
	"&:hover": { background: theme.palette.primary.dark, boxShadow: "none" },
	"@media (prefers-reduced-motion: reduce)": {
		transition: "none",
		"&:hover, &:active": { transform: "none" },
	},
	"@container event-feed-header (max-width: 599px)": {
		padding: theme.spacing(0, 1),
		"& .MuiButton-startIcon": { display: "none" },
	},
}));
