import { styled } from "@mui/material/styles";

import { BntCard } from "@/shared/ui/card";

export const RequestsPagePanel = styled(BntCard)(({ theme }) => ({
	borderRadius: theme.spacing(1),
	border: `1px solid ${theme.palette.divider}`,
	boxShadow: theme.palette.mode === "dark" ? "0 12px 28px rgba(0,0,0,0.28)" : "0 12px 32px rgba(30,31,37,0.06)",
}));
