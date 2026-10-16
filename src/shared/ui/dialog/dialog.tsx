import { SyntheticEvent, useCallback } from "react";
import { DialogProps } from "@mui/material";

import { DialogStyled } from "./DialogStyled";

interface IProps extends DialogProps {
	handleClose: VoidFunction;
	preventCloseOnBackDropClick?: boolean;
	isLoading?: boolean;
	isTop?: boolean;
}

// Wraps the styled dialog with the backdrop policy; whether it goes fullscreen is decided by the caller.
export function BntDialog({ handleClose, preventCloseOnBackDropClick, isLoading, isTop, ...sharedProps }: IProps) {
	const onClose = useCallback(
		(event: SyntheticEvent, reason: string) => {
			if (reason !== "backdropClick" || !preventCloseOnBackDropClick) {
				handleClose();
			}
		},
		[handleClose, preventCloseOnBackDropClick]
	);

	return <DialogStyled {...sharedProps} onClose={onClose} isLoading={isLoading} isTop={isTop} />;
}
