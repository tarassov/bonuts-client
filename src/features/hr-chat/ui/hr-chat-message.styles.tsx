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
	whiteSpace: "pre-wrap",
	overflowWrap: "anywhere",
}));

/** What the analyst replied: aligned left on a plain surface; `hint` marks a reply that asks to narrow the question. */
export const ReplyBubble = styled(Box, { shouldForwardProp: (prop) => prop !== "hint" })<{ hint?: boolean }>(({ theme, hint }) => ({
	maxWidth: "min(100%, 720px)",
	alignSelf: "flex-start",
	padding: theme.spacing(1.25, 1.75),
	borderRadius: theme.spacing(2),
	borderBottomLeftRadius: theme.spacing(0.5),
	border: `1px solid ${hint ? alpha(theme.palette.info.main, 0.4) : theme.palette.divider}`,
	background: hint ? alpha(theme.palette.info.main, 0.06) : theme.palette.background.paper,
	color: theme.palette.text.primary,
	overflowWrap: "anywhere",
}));

export const InlineCode = styled("code")(({ theme }) => ({
	fontFamily: "inherit",
	padding: theme.spacing(0, 0.5),
	borderRadius: theme.spacing(0.5),
	background: alpha(theme.palette.text.primary, 0.06),
}));

export const MarkdownList = styled("ul")(({ theme }) => ({
	margin: theme.spacing(0.5, 0),
	paddingLeft: theme.spacing(2.5),
	"& li + li": { marginTop: theme.spacing(0.25) },
}));
