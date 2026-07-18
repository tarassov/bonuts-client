import { useMemo } from "react";

import { FieldSize, FieldType, type TFormField } from "@/shared/ui/form";

import { useTransferValidation } from "./use-transfer-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { texts_a, texts_c } from "@/services/localization/texts";

export type TTransferForm = { comment: string; amount: number };

export const useTransferFormFields = (args: { maxAmount?: number }) => {
	const { maxAmount } = args;

	const { formSchema } = useTransferValidation(maxAmount);
	const resolver = yupResolver(formSchema);

	const fields: Array<TFormField<TTransferForm>> = useMemo(
		() => [
			{
				image: false,
				size: FieldSize.xs,
				type: FieldType.number,
				name: "amount",
				label: texts_a.amount,
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
				label: texts_c.comment,
				placeholder: texts_c.comment,
				type: FieldType.textarea,
				required: true,
				xs: 12,
			},
		],
		[maxAmount]
	);

	return { fields, resolver };
};
