import { styled } from "@mui/material/styles";

import Typography from "@mui/material/Typography";

export const BntTypography = styled(Typography, {
	shouldForwardProp: (prop) => prop !== "isPreformatted",
})<{ isPreformatted?: boolean }>(({ isPreformatted }) => ({
	...(isPreformatted ? { whiteSpace: "pre-wrap" } : null),
}));
