import { Dialog, DialogProps, useTheme, useMediaQuery } from "@mui/material";
import { FC } from "react";
import { TBntModal } from "../types/dialog";

export const BntDialog: FC<
	DialogProps & {
		modal: TBntModal<any>;
		handleClose: (modal: TBntModal<any>) => void;
	}
> = (props) => {
	const { handleClose, modal, ...sharedProps } = props;
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const onClose = () => {
		handleClose(modal);
	};
	return <Dialog {...sharedProps} onClose={onClose} fullScreen={fullScreen} />;
};
