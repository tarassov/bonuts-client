import { FC } from "react";
import { BntBox } from "shared/ui/box/bnt-box";
import { TDialogProps } from "shared/ui/dialog/dialog-types";

import { emptyFunction } from "utils/empty-function";

import { AdminDepositForm } from "components/admin-deposit/admin-deposit-form";

export const ModalAdminDeposit: FC<TDialogProps & { id: number }> = ({ close = emptyFunction, id }) => {
	return (
		<BntBox sx={{ m: 3, minHeight: "250px" }}>
			<AdminDepositForm profileIds={[id]} onSuccess={close} />
		</BntBox>
	);
};
