import { Button, Stack } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const BrandSubmitButton = styled(Button)(({ theme }) => ({
	display: "inline-flex",
	alignItems: "center",
	gap: "11px",
	minWidth: 0,
	height: "50px",
	padding: "0 24px 0 15px",
	border: "none",
	borderRadius: "14px",
	background: "linear-gradient(90deg, #ff8a3d 0%, #e6ad57 100%)",
	boxShadow: "0 12px 24px rgba(255,138,61,.28)",
	color: "#fff",
	fontFamily: "Roboto",
	fontSize: "16px",
	fontWeight: 700,
	lineHeight: 1,
	textTransform: "none",
	transition: "transform 200ms ease, box-shadow 200ms ease, filter 200ms ease",
	"& .MuiButton-startIcon": {
		margin: 0,
	},
	"& .MuiButton-startIcon > *:first-of-type": {
		fontSize: "21px",
	},
	"&:hover": {
		background: "linear-gradient(90deg, #ff8a3d 0%, #e6ad57 100%)",
		transform: "translateY(-2px)",
		boxShadow: "0 16px 34px rgba(255,138,61,.44)",
		filter: "brightness(1.05)",
	},
	"&:active": {
		transform: "translateY(0)",
		boxShadow: "0 10px 20px rgba(255,138,61,.24)",
		filter: "brightness(1)",
	},
	"&.Mui-disabled": {
		background: theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[400],
		boxShadow: "none",
		color: theme.palette.common.white,
		cursor: "default",
	},
	"@media (prefers-reduced-motion: reduce)": {
		transition: "box-shadow 200ms ease",
		"&:hover": {
			transform: "none",
			filter: "none",
		},
		"&:active": {
			transform: "none",
			filter: "none",
		},
	},
}));

export const BrandIconCircle = styled("span")({
	width: "34px",
	height: "34px",
	borderRadius: "50%",
	background: "rgba(255,255,255,.22)",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	flexShrink: 0,
});

export const FormActions = styled(Stack, {
	shouldForwardProp: (prop) => prop !== "isContained" && prop !== "isSticky",
})<{ isContained?: boolean; isSticky?: boolean }>(({ isContained, isSticky, theme }) => ({
	...(isContained && {
		marginTop: theme.spacing(1),
		"& .MuiButton-root": {
			minWidth: 120,
			minHeight: 44,
			borderRadius: theme.shape.borderRadius * 1.5,
			fontWeight: 600,
		},
		[theme.breakpoints.down("sm")]: {
			width: "100%",
			gap: theme.spacing(1),
			"& .MuiButton-root": {
				flex: 1,
				minWidth: 0,
			},
		},
	}),
	...(isSticky && {
		position: "fixed",
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: theme.zIndex.appBar,
		margin: 0,
		padding: theme.spacing(1, 2),
		borderTop: `1px solid ${theme.palette.divider}`,
		backgroundColor: alpha(theme.palette.background.default, 0.78),
		backdropFilter: "blur(8px)",
		"& .MuiButton-root": {
			height: 40,
			minHeight: 40,
			paddingInline: theme.spacing(1.5),
			fontSize: theme.typography.body2.fontSize,
		},
		"& .MuiButton-startIcon > span": {
			width: 28,
			height: 28,
		},
		"& .MuiButton-startIcon > span svg": {
			fontSize: 17,
		},
		[theme.breakpoints.down("sm")]: {
			justifyContent: "center",
			gap: theme.spacing(1),
			paddingInline: theme.spacing(2),
		},
	}),
}));
