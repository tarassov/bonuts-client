import { FC, useMemo } from "react";
import { useTransfer } from "logic/hooks/operation/use-transfer";
import { BntForm } from "shared/ui/form/bnt-form";
import { TransferFormType, useTransferFormFields } from "components/transfer/use-transfer-form-fields";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_t } from "services/localization/texts/texts_t";
import { useAccountBalanceLoader } from "logic/hooks/account/use-account-balance-loader";
import { useAuth } from "shared/model/auth/use-auth";

export const TransferForm: FC<{ id: number; onSuccess?: VoidFunction }> = ({ id, onSuccess }) => {
	const { auth } = useAuth();

	const { account } = useAccountBalanceLoader(auth.profile?.distrib_account?.id);
	const { transferMyDonuts } = useTransfer();
	const { t } = useBntTranslate();
	const { fields, resolver } = useTransferFormFields({ maxAmount: account?.balance });
	const onSubmit = (args: TransferFormType, onError?: (message?: string) => void) => {
		const { amount, comment } = args;
		transferMyDonuts({ amount, comment, ids: [id] }, { onSuccess, onError });
	};

	const initialValues = useMemo(() => {
		return {
			amount: 1,
			comment: "",
		};
	}, []);

	return (
		<BntForm
			formId="transfer-donuts"
			onSubmit={onSubmit}
			fields={fields}
			resolver={resolver}
			submitCaption={t(texts_t.transfer_donuts)}
			hasInitial
			initialValues={initialValues}
		/>
	);
};
