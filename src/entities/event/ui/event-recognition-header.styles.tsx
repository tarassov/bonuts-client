import { ButtonBase, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";

export const RecognitionHeader = styled("div")(({ theme }) => ({
	display: "grid",
	gridTemplateColumns: "minmax(0, 1fr) auto",
	alignItems: "center",
	gap: theme.spacing(1),
	padding: theme.spacing(2),
	borderBottom: `1px solid ${theme.palette.divider}`,
	"& > button": { gridColumn: 1 },
	"& > svg": { gridColumn: 2, transform: "rotate(90deg)", color: theme.palette.primary.dark, fontSize: 20 },
	[theme.breakpoints.up("sm")]: { padding: theme.spacing(2, 2.5) },
	"@container event-card (min-width: 420px)": {
		gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
		"& > button": { gridColumn: "auto" },
		"& > svg": { gridColumn: "auto", transform: "none" },
	},
	"@container event-card (min-width: 540px)": { gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr) auto" },
}));

export const RecognitionPerson = styled(ButtonBase)(({ theme }) => ({
	minWidth: 0,
	justifyContent: "flex-start",
	gap: theme.spacing(1.25),
	borderRadius: 10,
	textAlign: "left",
	"& .MuiAvatar-root": { width: 40, height: 40, borderRadius: 12 },
	"& > span:last-child": { minWidth: 0, overflowWrap: "anywhere" },
	"&:hover": { backgroundColor: theme.palette.action.hover },
	"&.Mui-focusVisible": { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 3 },
}));

export const RecognitionAmount = styled("span")(({ theme }) => ({
	display: "inline-flex",
	alignItems: "center",
	gap: theme.spacing(0.5),
	gridColumn: "1 / -1",
	justifySelf: "end",
	padding: theme.spacing(0.5, 1),
	borderRadius: 12,
	border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
	backgroundColor: alpha(theme.palette.secondary.main, 0.08),
	color: theme.palette.text.primary,
	fontSize: 13,
	fontWeight: 700,
	whiteSpace: "nowrap",
	"@container event-card (min-width: 420px)": { gridColumn: 3 },
	"@container event-card (min-width: 540px)": { gridColumn: 4 },
}));
