import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const BntRoundButton = styled(Button, {
	shouldForwardProp: () => true,
})(({ theme }) => ({
	borderRadius: "30px",
	fontSize: 10,
}));
