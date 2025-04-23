import { DialogProps, useTheme, useMediaQuery } from "@mui/material";
import { FC, SyntheticEvent } from "react";
import { DialogStyled } from "shared/ui/modal/DialogStyled";
import { TBntModal } from "../types/dialog-types";

export const BntDialog: FC<
	DialogProps & {
		modal: TBntModal<any>;
		handleClose: (modal: TBntModal<any>) => void;
		preventCloseOnBackDropClick?: boolean;
		isLoading?: boolean;
		isTop?: boolean;
	}
> = (props) => {
	const { handleClose, modal, preventCloseOnBackDropClick, isLoading, isTop, ...sharedProps } =
		props;
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
