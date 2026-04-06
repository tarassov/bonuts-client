import { ButtonBase, styled } from "@mui/material";

export const LeaderButton = styled(ButtonBase)(({ theme }) => ({
	width: "100%",
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(1.25),
	padding: theme.spacing(0.5),
	borderRadius: theme.spacing(1.5),
	textAlign: "left",
	justifyContent: "flex-start",
	transition: theme.transitions.create(["background-color", "transform"]),
	"&:hover": {
		backgroundColor: theme.palette.common.white,
		transform: "translateX(2px)",
	},
}));
