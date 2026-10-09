import { styled } from "@mui/material";

export const ImageUploadDropzone = styled("div")(({ theme }) => ({
	display: "flex",
	minHeight: 220,
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
	gap: theme.spacing(1),
	padding: theme.spacing(2),
	border: `1px dashed ${theme.palette.divider}`,
	borderRadius: theme.spacing(1.5),
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.secondary,
	textAlign: "center",
	cursor: "pointer",
	transition: theme.transitions.create(["border-color", "background-color"]),
	"&:hover": {
		borderColor: theme.palette.primary.main,
		backgroundColor: theme.palette.primary.light,
	},
	"& p": {
		maxWidth: 220,
		margin: 0,
		fontSize: theme.typography.body2.fontSize,
	},
}));

export const ImageUploadPreview = styled("div")(({ theme }) => ({
	display: "grid",
	minHeight: 220,
	placeItems: "center",
	padding: theme.spacing(1),
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: theme.spacing(1.5),
	backgroundColor: theme.palette.background.default,
	"& > div:first-of-type": { maxHeight: 190 },
}));
