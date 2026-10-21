import { alpha, styled } from "@mui/material/styles";

import { BntCard } from "@/shared/ui/card";

export const QuestionCardRoot = styled(BntCard)({
	borderRadius: 16,
	overflow: "hidden",
});

/** The question itself sits on the dark "box" surface; the answer below it on the regular card. */
export const QuestionHead = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(1.25),
	padding: theme.spacing(2.25, 2.75),
	backgroundColor: theme.palette.inverse.main,
	color: theme.palette.inverse.contrastText,
	[theme.breakpoints.down("sm")]: {
		padding: theme.spacing(2),
	},
}));

export const QuestionMeta = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	flexWrap: "wrap",
	gap: theme.spacing(1.25),
}));

export const AnonymousLine = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(1),
	fontSize: 12,
	color: theme.palette.inverse.veryLight,
	"& svg": { fontSize: 16 },
}));

export const MetaDot = styled("span")(({ theme }) => ({
	width: 3,
	height: 3,
	borderRadius: "50%",
	backgroundColor: alpha(theme.palette.inverse.contrastText, 0.3),
}));

export const QuestionText = styled("p")({
	margin: 0,
	fontSize: 16,
	fontWeight: 500,
	lineHeight: 1.55,
	whiteSpace: "pre-wrap",
	overflowWrap: "anywhere",
});

export const QuestionBody = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(1.75),
	padding: theme.spacing(2.25, 2.75, 2.5),
	[theme.breakpoints.down("sm")]: {
		padding: theme.spacing(2),
	},
}));
