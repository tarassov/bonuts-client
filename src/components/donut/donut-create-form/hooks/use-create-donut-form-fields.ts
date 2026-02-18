import { FieldSize, FieldType, TFieldGroup, TFormField } from "shared/ui/form/types/bnt-form";

import { TDonut } from "@/types/model";

export const useCreateDonutFormFields = () => {
	const groups: Array<TFieldGroup> = [
		{
			id: 1,
			md: 6,
			xs: 12,
		},
		{
			id: 2,
			md: 6,
			xs: 12,
		},
	];
	const fields: Array<TFormField<TDonut>> = [
		{
			image: true,
			size: FieldSize.xs,
			name: "logo",
			label: "Logo",
			type: FieldType.imageUpload,
			xs: 12,
			md: 12,
			group: 1,
		},
		{
			image: false,
			size: FieldSize.xs,
			name: "name",
			label: "name",
			xs: 12,
			required: true,
			group: 2,
		},
		{
			disabled: false,
			type: FieldType.number,
			image: false,
			size: FieldSize.xs,
			name: "price",
			label: "price",
			required: true,
			xs: 12,
			group: 2,
		},
	];

	return { fields, groups };
};
