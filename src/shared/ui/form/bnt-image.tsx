import { styled } from "@mui/material";

export const BntImage = styled("img")(({ theme }) => ({
	display: "block",
	maxWidth: "95%",
	maxHeight: 600,
	margin: "auto",
	padding: 0,
	[theme.breakpoints.down("xs")]: {
		width: 200,
	},
}));
