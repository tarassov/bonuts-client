import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BntRoundButton = styled(Button, {
	shouldForwardProp: () => true,
})(() => ({
	borderRadius: "30px",
	fontSize: 10,
}));
