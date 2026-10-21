import { styled } from "@mui/material/styles";

export const FooterRoot = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	flexWrap: "wrap",
	gap: theme.spacing(1.5),
	paddingTop: theme.spacing(1.5),
	borderTop: `1px solid ${theme.palette.divider}`,
}));

export const VisibilityLine = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(0.75),
	fontSize: 12,
	color: theme.palette.text.secondary,
	"& svg": { fontSize: 16 },
}));
