import { styled } from "@mui/material/styles";
import { BntButton } from "shared/buttons/bnt-button";

export const BntRegularButton = styled(BntButton, {
	shouldForwardProp: () => true,
})(({ theme }) => ({
	fontSize: 16,
	background: theme.palette.primary.light,
	color: theme.palette.getContrastText(theme.palette.primary.light),
	padding: "6px 12px",
	"&:hover": {
		background: theme.palette.primary.dark,
		color: theme.palette.getContrastText(theme.palette.primary.dark),
	},
}));
