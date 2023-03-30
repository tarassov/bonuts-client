import { styled, Typography } from "@mui/material";

export const DonutPrice = styled(Typography, {
	shouldForwardProp: () => true,
})(({ theme }) => ({
	fontSize: "18px",
	fontWeight: "bold",
}));
