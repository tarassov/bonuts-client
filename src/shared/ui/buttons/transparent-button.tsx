import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BntTransparentButton = styled(Button, {
	shouldForwardProp: () => true,
})(() => ({
	boxShadow: "none",
	textTransform: "none",
	fontSize: 16,
	padding: "6px 12px",
}));
