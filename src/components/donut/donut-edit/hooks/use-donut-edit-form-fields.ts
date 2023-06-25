import { TFieldGroup, TFieldSize, TFieldType, TFormField } from "shared/form/types/bnt-form";

export const useDonutEditFormFields = () => {
	const groups: Array<TFieldGroup> = [
		{
			id: 1,
			md: 5,
			lg: 3,
			xs: 12,
		},
		{
			id: 2,
			md: 7,
			lg: 9,
			xs: 12,
			padding: { pt: 2 },
		},
	];
	const fields: Array<TFormField> = [
		{
			image: true,
			size: TFieldSize.xs,
			name: "logo",
			label: "Logo",
			type: TFieldType.imageUpload,
			xs: 12,
			md: 12,
			group: 1,
		},
		{
			image: false,
			size: TFieldSize.xs,
			name: "name",
			label: "name",
			xs: 12,
			required: true,
			group: 2,
		},
		{
			disabled: false,
			type: TFieldType.number,
			image: false,
			size: TFieldSize.xs,
			name: "price",
			label: "price",
			required: true,
			xs: 3,
			group: 2,
		},
		{
			disabled: false,
			type: TFieldType.date,
			image: false,
			size: TFieldSize.xs,
			name: "expiration_date",
			label: "expiration_date",
			required: false,
			xs: 3,
			group: 2,
		},
	];

	return { fields, groups };
};
