import { FC } from "react";
import { TModalProps } from "shared/types/dialog-types";
import { emptyFunction } from "utils/empty-function";
import { Box } from "@mui/material";
import { TransferForm } from "components/transfer/transfer-form";

export const ModalTransfer: FC<TModalProps & { id: number }> = ({ close = emptyFunction, id }) => {
	return (
		<Box sx={{ m: 3, minHeight: "250px" }}>
			<TransferForm id={id} onSuccess={close} />
		</Box>
	);
};
