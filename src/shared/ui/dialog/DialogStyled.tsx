import { Dialog, DialogProps } from "@mui/material";
import { styled } from "@mui/material/styles";

import { cl } from "themes/helper";

export const DialogStyled = styled(Dialog, {
	shouldForwardProp: (prop) => prop !== "isLoading" && prop !== "isTop",
})<DialogProps & { isLoading?: boolean; isTop?: boolean }>(({ theme, isLoading, isTop }) => {
	if (isLoading) {
		return {
			background: "transparent",
			[cl("MuiPaper-root")]: {
				overflow: "hidden",
				background: theme.palette.background.paper,
				borderRadius: "50%",
				opacity: 0.5,
			},
		};
	}
	if (isTop) {
		return {
			[cl("MuiDialog-scrollPaper")]: {
				alignItems: "start !important",
			},
		};
	}
	return {};
});
