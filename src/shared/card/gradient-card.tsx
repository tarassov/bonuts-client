import { styled } from "@mui/material/styles";
import { BntCard } from "shared/card/card";

export const GradientCard = styled(BntCard, {
	shouldForwardProp: () => true,
})(({ theme }) => ({
	background: `linear-gradient(60deg, ${theme.palette.secondary.light},${theme.palette.secondary.veryLight})`,
}));
