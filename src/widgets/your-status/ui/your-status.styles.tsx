import { Box, styled } from "@mui/material";

import type { TStatusTone } from "../model/your-status-helper";

export const StatusIcon = styled(Box, {
	shouldForwardProp: (prop) => prop !== "tone",
})<{ tone: TStatusTone }>(({ theme, tone }) => ({
	width: 28,
	height: 28,
	flexShrink: 0,
	borderRadius: theme.spacing(1.5),
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: theme.palette[tone].light,
	color: theme.palette[tone].main,
}));

export const ActivityHint = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "flex-start",
	gap: theme.spacing(1),
	padding: theme.spacing(1, 1.25),
	borderRadius: theme.spacing(1.5),
	backgroundColor: theme.palette.action.hover,
}));
