import { styled } from "@mui/material";
import { Shadows } from "../mixin/shadow";

export const ImageContainer = styled("div")((props: { round?: boolean }) => ({
	display: "inline-block",
	margin: "10px",
	overflow: "hidden",
	textAlign: "center",
	verticalAlign: "middle",
	maxWidth: "100%",
	...Shadows.big,
	...(props.round && { borderRadius: "50%", maxWidth: "100px" }),
	"& img": {
		display: "block",
		objectFit: "contain",
		maxWidth: "100%",
		maxHeight: "100%",
	},
	"&:hover": {
		cursor: "zoom-in",
	},
}));
