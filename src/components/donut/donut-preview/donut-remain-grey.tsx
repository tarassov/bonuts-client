import { styled, Typography } from "@mui/material";

export const DonutRemainGrey = styled(Typography, {
	shouldForwardProp: () => true,
})(({ theme }) => ({
	display: "block",
	color: theme.palette.grey.A700,
	fontSize: "14px",
	fontWeight: "bold",
}));
