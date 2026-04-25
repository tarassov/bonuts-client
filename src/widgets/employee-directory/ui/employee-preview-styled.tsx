import { Grid, Stack, styled } from "@mui/material";

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
		padding: theme.spacing(0.5, 1),
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

export const EmployeePreviewAvatarColumn = styled(Grid)(({ theme }) => {
	return {
		textAlign: "center",
		[theme.breakpoints.up("md")]: {
			textAlign: "left",
		},
	};
});

export const EmployeePreviewAvatarWrap = styled("div")(({ theme }) => {
	return {
		display: "flex",
		justifyContent: "center",
		[theme.breakpoints.up("md")]: {
			justifyContent: "flex-start",
		},
	};
});

export const EmployeePreviewCircles = styled(Stack)(({ theme }) => {
	return {
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(1),
		[theme.breakpoints.down("md")]: {
			marginLeft: 0,
		},
	};
});

export const EmployeePreviewIdentity = styled("div")(({ theme }) => {
	return {
		display: "grid",
		rowGap: theme.spacing(1.5),
	};
});

export const EmployeePreviewBio = styled(BntBox)(({ theme }) => {
	const isDarkMode = theme.palette.mode === "dark";

	return {
		padding: theme.spacing(2),
		borderRadius: theme.shape.borderRadius * 1.5,
		backgroundColor: isDarkMode ? theme.palette.background.paper : theme.palette.secondary.veryLight,
		border: `1px solid ${theme.palette.divider}`,
		color: theme.palette.text.primary,
	};
});
