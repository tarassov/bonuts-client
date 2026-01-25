import { FC, SyntheticEvent } from "react";
import { DialogProps, useMediaQuery, useTheme } from "@mui/material";
import { DialogStyled } from "shared/ui/dialog/DialogStyled";

import { TDialog } from "./dialog-types";

export const BntDialog: FC<
	DialogProps & {
		modal: TDialog<any>;
		handleClose: (modal: TDialog<any>) => void;
		preventCloseOnBackDropClick?: boolean;
		isLoading?: boolean;
		isTop?: boolean;
	}
> = (props) => {
	const { handleClose, modal, preventCloseOnBackDropClick, isLoading, isTop, ...sharedProps } = props;
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const onClose = (event: SyntheticEvent, reason: string) => {
		if (reason !== "backdropClick" || !preventCloseOnBackDropClick) {
			handleClose(modal);
		}
	};
	return (
		<DialogStyled
			{...sharedProps}
			onClose={onClose}
			fullScreen={fullScreen && !isLoading && modal.allowFullscreen}
			isLoading={isLoading}
			isTop={isTop}
		/>
	);
};
