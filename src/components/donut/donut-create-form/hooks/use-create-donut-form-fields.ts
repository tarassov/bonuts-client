import { TFieldGroup, TFieldSize, TFieldType, TFormField } from "shared/form/types/bnt-form";
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
			xs: 12,
			group: 2,
		},
	];

	return { fields, groups };
};
