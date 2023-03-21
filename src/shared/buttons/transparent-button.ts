import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const BntTransparentButton = styled(Button, {
	shouldForwardProp: () => true,
})(({ theme }) => ({
	boxShadow: "none",
	textTransform: "none",
	fontSize: 16,
	padding: "6px 12px",
}));
