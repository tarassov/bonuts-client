import { TFieldSize, TFieldType, TFormField } from "shared/form/types/bnt-form";

export type TransferFormType = { comment: string; amount: number; toSelfAccount: boolean };
export const useShareAllFormFields = () => {
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
		{
			image: false,
			size: TFieldSize.md,
			name: "toSelfAccount",
			label: "user can spend in store",
			disabledLabel: "to can transfer to others",
			placeholder: "type",
			type: TFieldType.switch,
			xs: 12,
		},
	];

	return { fields };
};
