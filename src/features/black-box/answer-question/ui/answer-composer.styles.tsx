import { styled } from "@mui/material/styles";

export const ComposerFooter = styled("div")(({ theme }) => ({
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

export const ComposerHint = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(0.75),
	fontSize: 12,
	color: theme.palette.text.secondary,
	"& svg": { fontSize: 16 },
}));

export const ComposerActions = styled("div")(({ theme }) => ({
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "flex-end",
	gap: theme.spacing(1.25),
	[theme.breakpoints.down("sm")]: {
		flexDirection: "column-reverse",
	},
}));
