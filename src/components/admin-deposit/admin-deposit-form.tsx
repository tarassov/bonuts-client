import { FC } from "react";

import { AdminDepositFormType, useAdminDepositFormFields } from "components/admin-deposit/use-admin-deposit-form-fields";

import { BntForm } from "@/shared/ui/form";

import { useTransfer } from "logic/hooks/operation/use-transfer";

export const AdminDepositForm: FC<{ profileIds: Array<number>; onSuccess?: VoidFunction }> = ({ profileIds, onSuccess }) => {
	const { adminDeposit } = useTransfer();
	const { fields } = useAdminDepositFormFields();
	const onSubmit = (args: AdminDepositFormType) => {
		const { amount, toSelfAccount, comment } = args;
		adminDeposit({ amount, toSelfAccount, comment, ids: profileIds }, { onSuccess });
	};

	return <BntForm formId="admin-deposit" onSubmit={onSubmit} fields={fields} />;
};
