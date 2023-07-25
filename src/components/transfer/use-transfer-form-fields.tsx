import { TFieldSize, TFieldType, TFormField } from "shared/form/types/bnt-form";

export type TransferFormType = { comment: string; amount: number };
export const useTransferFormFields = () => {
	const fields: Array<TFormField<TransferFormType>> = [
		{
			image: false,
			size: TFieldSize.xs,
			type: TFieldType.number,
			name: "amount",
			label: "amount",
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

	return { fields };
};
