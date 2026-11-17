import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { alpha } from "@mui/material/styles";

export const FeedFilter = styled(ToggleButtonGroup)(({ theme }) => ({
	display: "inline-grid",
	gridTemplateColumns: "repeat(2, 1fr)",
	minWidth: 0,
	padding: 3,
	gap: 3,
	borderRadius: 12,
	backgroundColor: theme.palette.action.hover,
}));

export const FeedFilterOption = styled(ToggleButton)(({ theme }) => ({
	minWidth: 0,
	minHeight: 38,
	padding: theme.spacing(0.5, 1),
	border: "0 !important",
	borderRadius: "9px !important",
	textTransform: "none",
	whiteSpace: "nowrap",
	fontSize: 13,
	lineHeight: 1.25,
	color: theme.palette.text.secondary,
	"&:hover": { backgroundColor: theme.palette.action.hover, color: theme.palette.text.primary },
	"&.Mui-selected, &.Mui-selected:hover": {
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.primary.dark,
		fontWeight: 600,
		boxShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.08)}`,
	},
	"&.Mui-focusVisible": { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: -2 },
	"@container event-feed-header (max-width: 599px)": { fontSize: 12, whiteSpace: "normal", padding: theme.spacing(0.5) },
}));
