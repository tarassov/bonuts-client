import { ButtonBase } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

import { BntStack } from "@/shared/ui/stack";

export const BalanceRow = styled(BntStack, { shouldForwardProp: (prop) => prop !== "tone" })<{ tone?: "primary" | "secondary" }>(({ theme, tone = "primary" }) => ({
	flexDirection: "row",
	alignItems: "center",
	gap: theme.spacing(1),
	borderRadius: theme.spacing(1.5),
	border: `1px solid ${theme.palette.divider}`,
	backgroundColor: alpha(theme.palette[tone].main, 0.04),
}));

export const BalanceAction = styled(ButtonBase)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(1),
	flex: 1,
	minWidth: 0,
	minHeight: 40,
	padding: theme.spacing(1, 1.25),
	borderRadius: "inherit",
	textAlign: "left",
	justifyContent: "flex-start",
}));
