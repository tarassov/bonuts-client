import { Box, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";

/** What the admin asked: aligned right, tinted with the brand color. */
export const RequestBubble = styled(Box)(({ theme }) => ({
	maxWidth: "min(100%, 720px)",
	alignSelf: "flex-end",
	padding: theme.spacing(1.25, 1.75),
	borderRadius: theme.spacing(2),
	borderBottomRightRadius: theme.spacing(0.5),
	background: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.24 : 0.12),
	color: theme.palette.text.primary,
}));

/** What the assistant replied: aligned left on a plain surface. */
export const ReplyBubble = styled(Box)(({ theme }) => ({
	maxWidth: "min(100%, 720px)",
	alignSelf: "flex-start",
	padding: theme.spacing(1.25, 1.75),
	borderRadius: theme.spacing(2),
	borderBottomLeftRadius: theme.spacing(0.5),
	border: `1px solid ${theme.palette.divider}`,
	background: theme.palette.background.paper,
	color: theme.palette.text.primary,
	whiteSpace: "pre-wrap",
	overflowWrap: "anywhere",
}));
