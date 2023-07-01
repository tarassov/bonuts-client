import { TFieldGroup, TFieldSize, TFieldType, TFormField } from "shared/form/types/bnt-form";
import { texts_o } from "services/localization/texts/texts_o";
import { texts_e } from "services/localization/texts";
import { texts_d } from "services/localization/texts/texts_d";
import { TDonut } from "@/types/model";

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
			lg: 8,
			offset: { lg: 4 },
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
			sm: 6,
			lg: 4,
			group: 2,
		},
		{
			disabled: false,
			type: TFieldType.date,
			image: false,
			size: TFieldSize.xs,
			name: "expiration_date",
			label: texts_e.expiration_date,
			required: false,
			xs: 12,
			sm: 6,
			lg: 4,
			offset: { lg: 4 },
			group: 2,
		},
		{
			disabled: false,
			type: TFieldType.number,
			image: false,
			size: TFieldSize.xs,
			name: "on_stock",
			label: texts_o.on_stock,
			required: false,
			xs: 12,
			md: 6,
			lg: 2,
			group: 2,
		},
		{
			disabled: false,
			type: TFieldType.number,
			image: false,
			size: TFieldSize.xs,
			name: "supply_days",
			label: texts_d.delivery_days,
			required: false,
			xs: 12,
			md: 6,
			lg: 2,
			offset: { lg: 4 },
			group: 2,
		},
		{
			disabled: false,
			type: TFieldType.textarea,
			image: false,
			size: TFieldSize.xs,
			name: "description",
			label: texts_d.description,
			required: false,
			xs: 12,

			lg: 8,
			group: 2,
		},
	];

	return { fields, groups };
};
