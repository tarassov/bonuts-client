import { type FC, useMemo } from "react";

import { useCurrentProfile } from "@/shared/model/auth";
import { BntForm, SubmitButtonVariant } from "@/shared/ui/form";

import type { TTransferRecipient } from "../model/use-transfer-form-fields";
import { type TTransferForm, useTransferFormFields } from "../model/use-transfer-form-fields";

import { TransferRecipient } from "./transfer-recipient";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useAccountBalanceLoader } from "@/logic/hooks/account/use-account-balance-loader";
import { useTransfer } from "@/logic/hooks/operation/use-transfer";
import { texts_g } from "@/services/localization/texts";

type TTransferFormProps = {
	id: number;
	recipient?: TTransferRecipient;
	onSuccess?: VoidFunction;
	onError?: (message?: string) => void;
};

export const TransferForm: FC<TTransferFormProps> = ({ id, recipient, onSuccess, onError }) => {
	const { profile } = useCurrentProfile();

	const { account } = useAccountBalanceLoader(profile?.distrib_account?.id);
	const { transferMyDonuts } = useTransfer();
	const { t } = useBntTranslate();
	const { fields, resolver } = useTransferFormFields({ maxAmount: account?.balance });
	const onSubmit = (args: TTransferForm, handleFormError?: (message?: string) => void) => {
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
		<>
			{recipient ? <TransferRecipient recipient={recipient} /> : null}
			<BntForm
				formId="transfer-donuts"
				onSubmit={onSubmit}
				fields={fields}
				resolver={resolver}
				submitCaption={t(texts_g.give_donuts)}
				submitButtonVariant={SubmitButtonVariant.brandGradient}
				isSubmitDisabled={!account || account.balance < 1}
				isSubmitDisabledWhenInvalid
				validationMode="onBlur"
				hasInitial
				initialValues={initialValues}
			/>
		</>
	);
};
