import { FC } from "react";
import { TModalProps } from "shared/ui/types/dialog-types";
import { emptyFunction } from "utils/empty-function";
import { useMediaQuery, useTheme } from "@mui/material";
import { BntBox } from "shared/ui/box/bnt-box";
import { TransferForm } from "components/transfer/transfer-form";

export const ModalTransfer: FC<TModalProps & { id: number }> = ({ close = emptyFunction, id }) => {
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<BntBox sx={{ m: 3, minHeight: "400px", minWidth: matchesDownSm ? undefined : "450px" }}>
			<TransferForm id={id} onSuccess={close} />
		</BntBox>
	);
};
