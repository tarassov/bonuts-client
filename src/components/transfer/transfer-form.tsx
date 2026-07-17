import { FC, useMemo } from "react";

import { TransferFormType, useTransferFormFields } from "components/transfer/use-transfer-form-fields";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_g } from "services/localization/texts";

import { useCurrentProfile } from "@/shared/model/auth";
import { BntForm, SubmitButtonVariant } from "@/shared/ui/form";

import { useAccountBalanceLoader } from "logic/hooks/account/use-account-balance-loader";
import { useTransfer } from "logic/hooks/operation/use-transfer";

type TTransferFormProps = {
	id: number;
	onSuccess?: VoidFunction;
	onError?: (message?: string) => void;
};

export const TransferForm: FC<TTransferFormProps> = ({ id, onSuccess, onError }) => {
	const { profile } = useCurrentProfile();

	const { account } = useAccountBalanceLoader(profile?.distrib_account?.id);
	const { transferMyDonuts } = useTransfer();
	const { t } = useBntTranslate();
	const { fields, resolver } = useTransferFormFields({ maxAmount: account?.balance });
	const onSubmit = (args: TransferFormType, handleFormError?: (message?: string) => void) => {
		const { amount, comment } = args;
		const handleTransferError = (message?: string) => {
			handleFormError?.(message);
			onError?.(message);
		};

		transferMyDonuts({ amount, comment, ids: [id] }, { onSuccess, onError: handleTransferError });
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
			submitCaption={t(texts_g.give_donuts)}
			submitButtonVariant={SubmitButtonVariant.brandGradient}
			hasInitial
			initialValues={initialValues}
		/>
	);
};
