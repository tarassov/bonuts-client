import { ExpandMoreRounded } from "@mui/icons-material";
import { Box, styled } from "@mui/material";

import { BntCard, BntCardActionArea } from "@/shared/ui/card";

import type { IDashboardWidgetSizingProps } from "./types";

export const WidgetContainer = styled(Box, {
	shouldForwardProp: (prop) => prop !== "columns",
})<Required<Pick<IDashboardWidgetSizingProps, "columns">>>(({ columns, theme }) => ({
	[theme.breakpoints.up("lg")]: {
		gridColumn: columns === 2 ? "span 2" : "span 1",
	},
}));

export const SidebarCard = styled(BntCard)(({ theme }) => ({
	borderRadius: theme.spacing(2),
	height: "100%",
	overflow: "hidden",
}));

export const WidgetContent = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2),
	height: "100%",
}));

export const WidgetHeader = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: theme.spacing(1),
	marginBottom: theme.spacing(2),
}));

export const MobileHeader = styled(Box)({
	display: "flex",
	alignItems: "center",
});

export const MobileHeaderAction = styled(Box)(({ theme }) => ({
	paddingRight: theme.spacing(2),
}));

export const MobileWidgetHeader = styled(BntCardActionArea)(({ theme }) => ({
	flex: 1,
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: theme.spacing(1),
	padding: theme.spacing(2),
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
