import { FC } from "react";
import { TModalProps } from "shared/types/dialog-types";
import { emptyFunction } from "utils/empty-function";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { TransferForm } from "components/transfer/transfer-form";

export const ModalTransfer: FC<TModalProps & { id: number }> = ({ close = emptyFunction, id }) => {
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<Box sx={{ m: 3, minHeight: "400px", minWidth: matchesDownSm ? undefined : "450px" }}>
			<TransferForm id={id} onSuccess={close} />
		</Box>
	);
};
