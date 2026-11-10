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
	boxShadow: "none",
	transition: theme.transitions.create(["transform", "background-color"], { duration: 200 }),
	"&:hover": { background: theme.palette.primary.dark, boxShadow: "none", transform: "translateY(-2px)" },
	"&:active": { transform: "translateY(0)" },
	"@media (prefers-reduced-motion: reduce)": {
		transition: "none",
		"&:hover, &:active": { transform: "none" },
	},
	[theme.breakpoints.down("sm")]: {
		padding: theme.spacing(0, 1),
		"& .MuiButton-startIcon": { display: "none" },
	},
}));
