import { styled, Typography } from "@mui/material";

export const DonutPrice = styled(Typography, {
	shouldForwardProp: () => true,
})(() => ({
	fontSize: "18px",
	fontWeight: "bold",
}));
