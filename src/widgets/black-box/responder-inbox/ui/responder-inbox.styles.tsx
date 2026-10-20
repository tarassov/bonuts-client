import { styled } from "@mui/material/styles";

export const EmptyInbox = styled("div")(({ theme }) => ({
	padding: theme.spacing(4),
	borderRadius: 16,
	textAlign: "center",
	fontSize: 14,
	lineHeight: 1.6,
	color: theme.palette.text.secondary,
	backgroundColor: theme.palette.action.hover,
}));
