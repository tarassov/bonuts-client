import { useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldSize, FieldType, TFormField } from "shared/ui/form/types/bnt-form";

import { useTransferValidation } from "components/transfer/use-transfer-validation";

export type TransferFormType = { comment: string; amount: number };
export const useTransferFormFields = (args: { maxAmount?: number }) => {
	const { maxAmount } = args;

	const { formSchema } = useTransferValidation(maxAmount);
	const resolver = yupResolver(formSchema);

	const fields: Array<TFormField<TransferFormType>> = useMemo(
		() => [
			{
				image: false,
				size: FieldSize.xs,
				type: FieldType.number,
				name: "amount",
				label: "amount",
				maxValue: maxAmount,
				minValue: 1,
				xs: 12,
				required: true,
			},
			{
				disabled: false,
				image: false,
				size: FieldSize.xs,
				name: "comment",
				label: "comment",
				placeholder: "comment",
				type: FieldType.textarea,
				required: true,
				xs: 12,
			},
		],
		[maxAmount]
	);

	return { fields, resolver };
};
