import { styled } from "@mui/material/styles";

import { BntCard } from "@/shared/ui/card";

export const NoticeCard = styled(BntCard)(({ theme }) => ({
	padding: theme.spacing(3),
	borderRadius: 16,
	textAlign: "center",
	color: theme.palette.text.secondary,
}));
