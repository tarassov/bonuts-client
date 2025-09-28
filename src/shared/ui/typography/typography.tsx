import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const CUSTOM_PROPS: PropertyKey[] = ["isPreformatted", "opacity"];

export const BntTypography = styled(Typography, {
	shouldForwardProp: (prop) => !CUSTOM_PROPS.includes(prop),
})<{ isPreformatted?: boolean; opacity?: number }>(({ isPreformatted, opacity }) => ({
	...(isPreformatted ? { whiteSpace: "pre-wrap" } : null),
	...(opacity ? { opacity } : null),
}));
