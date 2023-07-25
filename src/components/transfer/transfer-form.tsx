import { FC } from "react";
import { useTransfer } from "logic/hooks/operation/use-transfer";
import { BntForm } from "shared/form/bnt-form";
import {
	TransferFormType,
	useTransferFormFields,
} from "components/transfer/use-transfer-form-fields";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_t } from "services/localization/texts/texts_t";

export const TransferForm: FC<{ id: number; onSuccess?: VoidFunction }> = ({ id, onSuccess }) => {
	const { transferMyDonuts } = useTransfer();
	const { t } = useBntTranslate();
	const { fields } = useTransferFormFields();
	const onSubmit = (args: TransferFormType, onError?: (message?: string) => void) => {
		const { amount, comment } = args;
		transferMyDonuts({ amount, comment, ids: [id] }, { onSuccess, onError });
	};

	return (
		<BntForm
			formId="transfer-donuts"
			onSubmit={onSubmit}
			fields={fields}
			submitCaption={t(texts_t.transfer_donuts)}
		/>
	);
};
