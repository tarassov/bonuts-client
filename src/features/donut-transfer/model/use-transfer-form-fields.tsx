import { useMemo } from "react";

import { present } from "@/shared/lib/type-guards";
import { FieldSize, FieldType, type TFormField } from "@/shared/ui/form";

import { useTransferValidation } from "./use-transfer-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_a, texts_c } from "@/services/localization/texts";

export type TTransferForm = { comment: string; amount: number };

export type TTransferRecipient = {
	id: number;
	name?: string | null;
	avatarUrl?: string | null;
};

export const useTransferFormFields = (args: { maxAmount?: number }) => {
	const { maxAmount } = args;
	const { t } = useBntTranslate();

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
				helperText: present(maxAmount) && maxAmount > 0 ? t(texts_a.allowed_amount_range, { min: 1, max: maxAmount }) : undefined,
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
		[maxAmount, t]
	);

	return { fields, resolver };
};
