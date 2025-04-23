import { styled } from "@mui/material/styles";
import { BntButton } from "shared/ui/buttons/bnt-button";

export const BntRegularSecondaryButton = styled(BntButton, {
	shouldForwardProp: () => true,
})(({ theme }) => ({
	fontSize: 16,
	background: theme.palette.secondary.light,
	color: theme.palette.getContrastText(theme.palette.primary.light),
	padding: "6px 12px",
	"&:hover": {
		background: theme.palette.secondary.main,
		color: theme.palette.getContrastText(theme.palette.secondary.light),
	},
}));
