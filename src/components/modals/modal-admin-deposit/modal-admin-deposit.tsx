import { FC } from "react";
import { TModalProps } from "shared/ui/types/dialog-types";
import { emptyFunction } from "utils/empty-function";
import { AdminDepositForm } from "components/admin-deposit/admin-deposit-form";
import { BntBox } from "shared/ui/box/bnt-box";

export const ModalAdminDeposit: FC<TModalProps & { id: number }> = ({
	close = emptyFunction,
	id,
}) => {
	return (
		<BntBox sx={{ m: 3, minHeight: "250px" }}>
			<AdminDepositForm profileIds={[id]} onSuccess={close} />
		</BntBox>
	);
};
