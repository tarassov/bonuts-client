import { styled } from "@mui/material";

export const BntDrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));
