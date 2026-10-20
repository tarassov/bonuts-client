import { styled } from "@mui/material/styles";

export const AnswerText = styled("p")(({ theme }) => ({
	margin: 0,
	maxWidth: "62ch",
	fontSize: 14,
	lineHeight: 1.7,
	color: theme.palette.text.primary,
	whiteSpace: "pre-wrap",
	overflowWrap: "anywhere",
}));
