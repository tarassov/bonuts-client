import { IconButton, styled } from "@mui/material";

export const CarouselRoot = styled("section")({
	width: "100%",
});

export const CarouselControls = styled("div")(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	gap: theme.spacing(0.5),
	marginTop: theme.spacing(1),
}));

export const CarouselControlButton = styled(IconButton)(({ theme }) => ({
	width: 32,
	height: 32,
	border: `1px solid ${theme.palette.divider}`,
	backgroundColor: theme.palette.background.paper,
	"&:hover": {
		backgroundColor: theme.palette.action.hover,
	},
}));

export const CarouselViewport = styled("div")(({ theme }) => ({
	display: "flex",
	gap: "var(--bnt-carousel-gap, 12px)",
	overflowX: "auto",
	scrollBehavior: "smooth",
	scrollSnapType: "x mandatory",
	scrollbarWidth: "none",
	"&::-webkit-scrollbar": {
		display: "none",
	},
	"& > *": {
		flex: "0 0 var(--bnt-carousel-item-width, 100%)",
		scrollSnapAlign: "start",
	},
	[theme.breakpoints.down("sm")]: {
		scrollPaddingInline: theme.spacing(1),
	},
}));
