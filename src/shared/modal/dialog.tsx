import { Dialog, DialogProps } from "@mui/material";
import { FC, ReactNode } from "react";
import { TBntModal } from "../types/dialog";
export const BntDialog: FC<
	DialogProps & { modal: TBntModal; handleClose: (modal: TBntModal) => void }
> = (props) => {
	const { handleClose, modal, ...sharedProps } = props;
	const onClose = () => {
		handleClose(modal);
	};
	return <Dialog {...sharedProps} onClose={onClose} />;
};
