import { FC } from "react";

import { AdminDepositForm } from "components/admin-deposit/admin-deposit-form";

import { BntBox } from "@/shared/ui/box";
import { TDialogProps } from "@/shared/ui/dialog";

export const ModalAdminDeposit: FC<TDialogProps & { id: number }> = ({ close, id }) => {
	return (
		<BntBox sx={{ m: 3, minHeight: "250px" }}>
			<AdminDepositForm profileIds={[id]} onSuccess={close} />
		</BntBox>
	);
};
