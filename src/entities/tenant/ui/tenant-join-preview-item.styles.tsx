import { Box, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { BntButton } from "@/shared/ui/buttons";

export const TenantItemRoot = styled("article")(({ theme }) => ({
	display: "grid",
	gridTemplateColumns: "auto minmax(0, 1fr) auto",
	gap: theme.spacing(2),
	alignItems: "center",
	padding: theme.spacing(1.75, 2.25),
	border: `1px solid ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.3 : 0.18)}`,
	borderRadius: theme.spacing(2),
	background: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.08 : 0.035),
	[theme.breakpoints.down("sm")]: {
		gridTemplateColumns: "auto minmax(0, 1fr)",
		padding: theme.spacing(1.75),
	},
}));

export const TenantLogo = styled(Box)(({ theme }) => ({
	display: "grid",
	placeItems: "center",
	width: 60,
	height: 60,
	borderRadius: theme.spacing(2.25),
	background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.22)}, ${alpha(theme.palette.primary.main, 0.07)})`,
	boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.22)}`,
	color: theme.palette.primary.main,
	fontSize: theme.typography.pxToRem(18),
	fontWeight: 800,
	overflow: "hidden",
	"& img": {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},
}));

export const TenantDetails = styled(Box)({ minWidth: 0 });

export const TenantTitle = styled("p")(({ theme }) => ({
	margin: 0,
	fontSize: theme.typography.pxToRem(17),
	fontWeight: 800,
	lineHeight: 1.35,
}));

export const TenantDescription = styled("p")(({ theme }) => ({
	margin: 0,
	color: alpha(theme.palette.text.primary, 0.68),
	lineHeight: 1.55,
}));

export const JoinButton = styled(BntButton)(({ theme }) => ({
	minHeight: 48,
	paddingInline: theme.spacing(2.5),
	borderRadius: theme.spacing(1.5),
	fontWeight: 700,
	whiteSpace: "nowrap",
	[theme.breakpoints.down("sm")]: {
		gridColumn: 2,
		justifySelf: "start",
	},
}));
