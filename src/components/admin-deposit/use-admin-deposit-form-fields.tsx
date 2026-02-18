import { FieldSize, FieldType, TFormField } from "shared/ui/form/types/bnt-form";

export type AdminDepositFormType = { comment: string; amount: number; toSelfAccount: boolean };
export const useAdminDepositFormFields = () => {
	const fields: Array<TFormField<AdminDepositFormType>> = [
		{
			image: false,
			size: FieldSize.xs,
			type: FieldType.number,
			name: "amount",
			label: "amount",
			xs: 12,
			required: true,
		},
		{
			disabled: false,
			image: false,
			size: FieldSize.xs,
			name: "comment",
			label: "comment",
			xs: 12,
		},
		{
			image: false,
			size: FieldSize.md,
			name: "toSelfAccount",
			label: "user can spend in store",
			disabledLabel: "to can transfer to others",
			placeholder: "type",
			type: FieldType.switch,
			xs: 12,
		},
	];

	return { fields };
};
