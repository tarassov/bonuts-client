import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const BntRegularSecondaryButton = styled(Button, {
	shouldForwardProp: () => true,
})(({ theme }) => ({
	fontSize: 16,
	background: theme.palette.secondary.light,
	color: theme.palette.getContrastText(theme.palette.primary.light),
	padding: "6px 12px",
	"&:hover": {
		background: theme.palette.secondary.veryLight,
		color: theme.palette.getContrastText(theme.palette.secondary.light),
	},
}));
