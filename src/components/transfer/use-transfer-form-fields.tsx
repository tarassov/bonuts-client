import { TFieldSize, TFieldType, TFormField } from "shared/form/types/bnt-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTransferValidation } from "components/transfer/use-transfer-validation";

export type TransferFormType = { comment: string; amount: number };
export const useTransferFormFields = (args: { maxAmount?: number }) => {
	const { maxAmount } = args;

	const { formSchema } = useTransferValidation(maxAmount);
	const resolver = yupResolver(formSchema);

	const fields: Array<TFormField<TransferFormType>> = [
		{
			image: false,
			size: TFieldSize.xs,
			type: TFieldType.number,
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
			size: TFieldSize.xs,
			name: "comment",
			label: "comment",
			placeholder: "comment",
			type: TFieldType.textarea,
			required: true,
			xs: 12,
		},
	];

	return { fields, resolver };
};
