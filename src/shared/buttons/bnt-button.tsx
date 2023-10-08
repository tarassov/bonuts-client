import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BntButton = styled(Button, {
	shouldForwardProp: (prop) => prop !== "noTransform",
})<{ noTransform?: boolean & ButtonProps }>(({ noTransform }) => ({
	textTransform: noTransform ? "none" : undefined,
}));
