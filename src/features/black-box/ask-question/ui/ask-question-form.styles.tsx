import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const AskHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	flexWrap: "wrap",
	gap: theme.spacing(1.25),
}));

export const AskTitle = styled("h2")(({ theme }) => ({
	margin: 0,
	fontSize: 15,
	fontWeight: 700,
	color: theme.palette.inverse.contrastText,
}));

/** Small grey line with an icon on the dark panel: the privacy badge and the hint under the field. */
export const PanelNote = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(0.75),
	fontSize: 12,
	color: theme.palette.inverse.veryLight,
	"& svg": { fontSize: 16 },
}));

/** A light field on the dark hero, as in the design. */
export const AskTextField = styled(TextField)(({ theme }) => ({
	"& .MuiInputBase-root": {
		borderRadius: 14,
		backgroundColor: theme.palette.background.paper,
	},
}));

export const AskFooter = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	flexWrap: "wrap",
	gap: theme.spacing(1.5),
	[theme.breakpoints.down("sm")]: {
		flexDirection: "column-reverse",
		alignItems: "stretch",
	},
}));
