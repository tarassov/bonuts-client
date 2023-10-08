import { styled } from "@mui/material/styles";
import { BntButton } from "shared/buttons/bnt-button";

export const BntCancelButton = styled(BntButton, {
	shouldForwardProp: () => true,
})(({ theme }) => ({
	fontSize: 16,
	background: theme.palette.error.light,
	color: theme.palette.getContrastText(theme.palette.primary.light),
	padding: "6px 12px",
	"&:hover": {
		background: theme.palette.error.main,
		color: theme.palette.getContrastText(theme.palette.secondary.light),
	},
}));
