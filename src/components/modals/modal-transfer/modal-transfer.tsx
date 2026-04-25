import { FC } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

import { TransferForm } from "components/transfer/transfer-form";
import { emptyFunction } from "utils/empty-function";

import { BntBox } from "@/shared/ui/box";
import { TDialogProps } from "@/shared/ui/dialog";

export const ModalTransfer: FC<TDialogProps & { id: number }> = ({ close = emptyFunction, id }) => {
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<BntBox sx={{ m: 3, minHeight: "400px", minWidth: matchesDownSm ? undefined : "450px" }}>
			<TransferForm id={id} onSuccess={close} />
		</BntBox>
	);
};
