import { Avatar, ButtonBase, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { BntBox } from "@/shared/ui/box";
import { BntCard, BntCardBody } from "@/shared/ui/card";
import { BntStack } from "@/shared/ui/stack";

export const EmployeePreviewRoot = styled(BntStack)(({ theme }) => {
	return {
		minHeight: "100%",
		gap: theme.spacing(1.5),
	};
});

export const EmployeePreviewActionsCard = styled(BntCard)(({ theme }) => {
	return {
		width: "100%",
		padding: theme.spacing(1),
		border: `1px solid ${theme.palette.divider}`,
		boxShadow: "none",
	};
});

export const EmployeePreviewContentCard = styled(BntCard)({
	flexGrow: 1,
});

export const EmployeePreviewContentBody = styled(BntCardBody)(({ theme }) => {
	return {
		padding: theme.spacing(2),
		[theme.breakpoints.up("md")]: {
			padding: theme.spacing(3),
		},
	};
});

export const EmployeePreviewLayout = styled("div")(({ theme }) => ({
	display: "grid",
	gridTemplateColumns: "80px minmax(0, 1fr)",
	gap: theme.spacing(2),
	[theme.breakpoints.up("md")]: {
		gridTemplateColumns: "192px minmax(0, 640px)",
		justifyContent: "start",
		columnGap: theme.spacing(3),
	},
}));

export const EmployeePreviewPortrait = styled("div")(({ theme }) => ({
	[theme.breakpoints.up("md")]: { gridRow: "span 2" },
}));

export const EmployeePreviewGallery = styled("div")({
	gridColumn: "1 / -1",
	minWidth: 0,
});

export const EmployeePreviewAvatar = styled(Avatar)(({ theme }) => ({
	width: 80,
	height: 80,
	borderRadius: theme.spacing(2),
	fontSize: 24,
	fontWeight: 600,
	backgroundColor: theme.palette.primary.light,
	color: theme.palette.getContrastText(theme.palette.primary.light),
	[theme.breakpoints.up("md")]: {
		width: 192,
		height: 192,
		fontSize: 48,
	},
}));

export const EmployeePreviewAvatarButton = styled(ButtonBase)(({ theme }) => ({
	alignSelf: "start",
	borderRadius: theme.spacing(2),
	"&.Mui-focusVisible": { outline: `2px solid ${theme.palette.text.primary}`, outlineOffset: 2 },
}));

export const EmployeePreviewIdentity = styled("div")(({ theme }) => ({
	display: "grid",
	gridTemplateColumns: "minmax(0, 1fr)",
	alignContent: "start",
	gap: theme.spacing(0.5),
	overflowWrap: "anywhere",
	"& h1": {
		fontSize: "1.5rem",
		fontWeight: 600,
		[theme.breakpoints.up("md")]: { fontSize: "2rem" },
	},
}));

export const EmployeePreviewDetails = styled("div")(({ theme }) => ({
	gridColumn: "1 / -1",
	display: "grid",
	gap: theme.spacing(0.5),
	[theme.breakpoints.up("md")]: { gridColumn: 2 },
}));

export const EmployeePreviewBio = styled(BntBox, {
	shouldForwardProp: (prop) => prop !== "isPlaceholder",
})<{ isPlaceholder: boolean }>(({ isPlaceholder, theme }) => {
	return {
		marginTop: theme.spacing(1),
		padding: theme.spacing(2),
		borderRadius: theme.shape.borderRadius * 1.5,
		backgroundColor: isPlaceholder ? theme.palette.background.paper : alpha(theme.palette.primary.main, 0.12),
		border: `1px solid ${theme.palette.divider}`,
		color: theme.palette.text.primary,
	};
});
