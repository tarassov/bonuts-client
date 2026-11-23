import { ExpandMoreRounded } from "@mui/icons-material";
import { Box, styled } from "@mui/material";

import { BntCard, BntCardActionArea } from "@/shared/ui/card";

import type { IDashboardWidgetSizingProps } from "./types";

export const WidgetContainer = styled(Box, {
	shouldForwardProp: (prop) => prop !== "columns",
})<Required<Pick<IDashboardWidgetSizingProps, "columns">>>(({ columns, theme }) => ({
	minWidth: 0,
	[theme.breakpoints.up("lg")]: {
		gridColumn: columns === 2 ? "1 / -1" : "auto",
	},
}));

export const SidebarCard = styled(BntCard)(({ theme }) => ({
	borderRadius: theme.spacing(2),
	border: `1px solid ${theme.palette.divider}`,
	boxShadow: "0 2px 10px rgba(15, 23, 42, 0.04)",
	overflow: "hidden",
}));

export const WidgetContent = styled(Box)(({ theme }) => ({
	padding: theme.spacing(1.5, 2),
	height: "100%",
}));

export const WidgetFooter = styled(Box)(({ theme }) => ({
	padding: theme.spacing(0, 2, 1),
}));

export const WidgetHeader = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	flexWrap: "wrap",
	justifyContent: "space-between",
	gap: theme.spacing(1),
	marginBottom: theme.spacing(1),
	paddingBottom: theme.spacing(0.75),
	borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const MobileHeader = styled(Box)({
	display: "flex",
	flexDirection: "column",
	alignItems: "stretch",
});

export const MobileHeaderAction = styled(Box)(({ theme }) => ({
	padding: theme.spacing(0, 2, 1),
}));

export const MobileWidgetHeader = styled(BntCardActionArea)(({ theme }) => ({
	flex: 1,
	minWidth: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: theme.spacing(1),
	padding: theme.spacing(1.5, 2),
	textAlign: "left",
}));

export const ExpandIcon = styled(ExpandMoreRounded, {
	shouldForwardProp: (prop) => prop !== "isExpanded",
})<{ isExpanded: boolean }>(({ isExpanded, theme }) => ({
	flexShrink: 0,
	transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

export const WidgetActionArea = styled(BntCardActionArea)({
	alignItems: "stretch",
	height: "100%",
	textAlign: "left",
});
