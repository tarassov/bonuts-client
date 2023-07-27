import { FC } from "react";
import { TModalProps } from "shared/types/dialog-types";
import { emptyFunction } from "utils/empty-function";
import { Box } from "@mui/material";
import { AdminDepositForm } from "components/admin-deposit/admin-deposit-form";

export const ModalAdminDeposit: FC<TModalProps & { id: number }> = ({
	close = emptyFunction,
	id,
}) => {
	return (
		<Box sx={{ m: 3, minHeight: "250px" }}>
			<AdminDepositForm profileIds={[id]} onSuccess={close} />
		</Box>
	);
};
