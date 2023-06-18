import { TFieldSize, TFieldType, TFormField } from "shared/form/types/bnt-form";

export const useCreateDonutFormFields = () => {
	const fields: Array<TFormField> = [
		{
			image: true,
			size: TFieldSize.xs,
			name: "user_avatar",
			label: "Avatar",
			type: TFieldType.imageUpload,
			xs: 12,
			md: 6,
		},
		{
			image: false,
			size: TFieldSize.xs,
			name: "name",
			label: "name",
			xs: 12,
			md: 6,
			required: true,
		},
		{
			disabled: false,
			type: TFieldType.number,
			image: false,
			size: TFieldSize.xs,
			name: "price",
			label: "price",
			xs: 12,
		},
	];

	return { fields };
};
