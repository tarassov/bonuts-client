import { ButtonBase } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const LeaderButton = styled(ButtonBase)(({ theme }) => ({
	"--leader-button-hover-background": theme.palette.mode === "dark" ? alpha(theme.palette.common.white, 0.08) : alpha(theme.palette.common.black, 0.04),
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
		backgroundColor: "var(--leader-button-hover-background)",
		transform: "translateX(2px)",
	},
}));
