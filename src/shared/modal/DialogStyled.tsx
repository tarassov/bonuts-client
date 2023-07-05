import { styled } from "@mui/material/styles";
import { Dialog, DialogProps } from "@mui/material";
import { cl } from "themes/helper";

export const DialogStyled = styled(Dialog, {
	shouldForwardProp: (prop) => prop !== "isLoading",
})<DialogProps & { isLoading?: boolean }>(({ theme, isLoading }) => {
	if (isLoading) {
		return {
			background: "transparent",
			[cl("MuiPaper-root")]: {
				overflow: "hidden",
				background: theme.palette.background,
				borderRadius: "50%",
				opacity: 0.5,
			},
		};
	}
	return {};
});
