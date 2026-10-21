import { Chip } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

import type { TQuestionStatusTone } from "../model/question-status-meta";

export const StatusChip = styled(Chip, { shouldForwardProp: (prop) => prop !== "tone" })<{ tone: TQuestionStatusTone }>(({ theme, tone }) => ({
	height: 24,
	fontWeight: 600,
	color: tone === "neutral" ? theme.palette.text.secondary : theme.palette[tone].main,
	backgroundColor: tone === "neutral" ? alpha(theme.palette.text.primary, 0.08) : alpha(theme.palette[tone].main, 0.14),
}));
