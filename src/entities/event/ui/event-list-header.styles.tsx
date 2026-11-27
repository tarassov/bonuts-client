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
	background: theme.palette.primary.main,
	color: theme.palette.common.black,
	boxShadow: "none",
	transition: theme.transitions.create(["background-color", "transform"], { duration: 200 }),
	"&:hover": { background: theme.palette.primary.dark, boxShadow: "none" },
	"@media (hover: hover) and (prefers-reduced-motion: no-preference)": {
		"&:hover": { transform: "translateY(-2px)" },
	},
	"@media (prefers-reduced-motion: no-preference)": {
		"&:active": { transform: "scale(0.98)" },
	},
	"&.Mui-focusVisible": { outline: `2px solid ${theme.palette.text.primary}`, outlineOffset: 2 },
	"@media (prefers-reduced-motion: reduce)": {
		transition: "none",
	},
	"@container event-feed-header (max-width: 599px)": {
		padding: theme.spacing(0, 1),
		"& .MuiButton-startIcon": { display: "none" },
	},
}));
