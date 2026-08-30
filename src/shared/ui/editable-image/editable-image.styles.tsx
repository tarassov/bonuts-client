import { styled } from "@mui/material/styles";

export const EditableImageButton = styled("button")(({ theme }) => ({
	position: "relative",
	width: 180,
	height: 180,
	padding: 0,
	overflow: "hidden",
	border: 0,
	borderRadius: 36,
	background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.accent.light})`,
	cursor: "pointer",
	"&:disabled": {
		cursor: "wait",
	},
	[theme.breakpoints.down("md")]: {
		width: 148,
		height: 148,
	},
}));

export const EditableImagePreview = styled("img")({
	display: "block",
	width: "100%",
	height: "100%",
	objectFit: "cover",
});

export const EditableImageFallback = styled("span")(({ theme }) => ({
	display: "flex",
	width: "100%",
	height: "100%",
	alignItems: "center",
	justifyContent: "center",
	color: theme.palette.accent.main,
	fontSize: "3.5rem",
	fontWeight: 700,
	letterSpacing: "0.08em",
	textTransform: "uppercase",
}));

export const EditableImageOverlay = styled("span")({
	position: "absolute",
	inset: 0,
	display: "flex",
	alignItems: "flex-end",
	justifyContent: "center",
	padding: 18,
	background: "linear-gradient(180deg, transparent 15%, rgba(30, 31, 37, 0.72) 100%)",
	color: "#fff",
	fontSize: "0.95rem",
	fontWeight: 600,
	opacity: 0,
	transition: "opacity 160ms ease",
	"button:hover &": {
		opacity: 1,
	},
	"button:focus-visible &": {
		opacity: 1,
	},
	"@media (hover: none)": {
		opacity: 1,
	},
});
