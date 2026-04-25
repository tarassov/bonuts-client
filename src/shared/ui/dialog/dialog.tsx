import { SyntheticEvent, useCallback } from "react";
import { DialogProps, useMediaQuery, useTheme } from "@mui/material";

import { DialogStyled } from "./DialogStyled";
import { TDialog } from "./dialog-types";

interface IProps extends DialogProps {
	modal: TDialog<any>;
	handleClose: (modal: TDialog<any>) => void;
	preventCloseOnBackDropClick?: boolean;
	isLoading?: boolean;
	isTop?: boolean;
}
export function BntDialog({ handleClose, modal, preventCloseOnBackDropClick, isLoading, isTop, ...sharedProps }: IProps) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const onClose = useCallback(
		(event: SyntheticEvent, reason: string) => {
			if (reason !== "backdropClick" || !preventCloseOnBackDropClick) {
				handleClose(modal);
			}
		},
		[handleClose, modal, preventCloseOnBackDropClick]
	);
	return <DialogStyled {...sharedProps} onClose={onClose} fullScreen={fullScreen && !isLoading && modal.allowFullscreen} isLoading={isLoading} isTop={isTop} />;
}
