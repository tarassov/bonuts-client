import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";

export const FeedFilter = styled(ToggleButtonGroup)(({ theme }) => ({
	position: "relative",
	display: "inline-grid",
	gridTemplateColumns: "repeat(2, 1fr)",
	minWidth: 0,
	"&::before": {
		content: '""',
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "50%",
		height: 2,
		backgroundColor: theme.palette.primary.main,
		pointerEvents: "none",
		transform: "translateX(0)",
		transition: theme.transitions.create("transform", { duration: 220 }),
		"@media (prefers-reduced-motion: reduce)": { transition: "none" },
	},
	'&[data-show-mine="true"]::before': { transform: "translateX(100%)" },
}));

export const FeedFilterOption = styled(ToggleButton)(({ theme }) => ({
	minWidth: 0,
	minHeight: 48,
	padding: theme.spacing(0.5, 1),
	border: 0,
	borderRadius: "0 !important",
	textTransform: "none",
	whiteSpace: "nowrap",
	fontSize: 14,
	color: theme.palette.text.secondary,
	"&:hover": { backgroundColor: "transparent", color: theme.palette.text.primary },
	"&.Mui-selected, &.Mui-selected:hover": {
		backgroundColor: "transparent",
		color: theme.palette.text.primary,
		fontWeight: 500,
	},
	"&.Mui-focusVisible": { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: -2 },
	[theme.breakpoints.down("sm")]: { fontSize: 12, whiteSpace: "normal", padding: theme.spacing(0.5) },
}));
