import { Box, styled } from "@mui/material";

import { BntTypography } from "@/shared/ui/typography";

export const MetricGrid = styled(Box)(({ theme }) => ({
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
	gap: theme.spacing(1),
}));

export const MetricTile = styled(Box)(({ theme }) => ({
	minWidth: 0,
	overflowWrap: "anywhere",
	display: "flex",
	flexDirection: "column",
	gap: 0,
	padding: theme.spacing(0.5, 1),
	borderRadius: theme.spacing(1.5),
	border: `1px solid ${theme.palette.divider}`,
	backgroundColor: theme.palette.action.hover,
}));

export const WeekCaption = styled(BntTypography)(({ theme }) => ({
	fontSize: theme.typography.caption.fontSize,
	color: theme.palette.text.secondary,
	flexShrink: 0,
}));
