import { TFieldGroup, TFieldSize, TFieldType, TFormField } from "shared/ui/form/types/bnt-form";
import { texts_o } from "services/localization/texts/texts_o";
import { texts_a, texts_e } from "services/localization/texts";
import { texts_d } from "services/localization/texts/texts_d";
import { useModal } from "hooks/use-modal";
import { CommonStrings } from "constants/dictionary";
import { texts_p } from "services/localization/texts/texts_p";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { TDonut } from "@/types/model";

export const useDonutEditFormFields = () => {
	const { ImageModal } = useModal();
	const { t } = useBntTranslate();

	const onClick = (url?: string) => {
		ImageModal.show({
			url: url || CommonStrings.EMPTY_STRING,
			title: t(texts_p.preview, { capitalize: true }),
		});
	};
	const groups: Array<TFieldGroup> = [
		{
			id: 1,
			md: 5,
			lg: 3,
			xs: 12,
			padding: { pt: 0 },
		},
		{
			id: 2,
			md: 7,
			lg: 9,
			xs: 12,
			padding: { pt: 0 },
			groups: [
				{
					id: 3,
					xs: 12,
					lg: 8,
					offset: {
						offsetAfterElement: { lg: 4 },
					},
					padding: { p: 1 },
					sx: () => {
						return {
							borderBottom: 1,
							boxShadow: 2,
							mb: 4,
						};
					},
				},
			],
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
			onClick: (value) => onClick(value?.toString()),
		},
		{
			image: false,
			size: TFieldSize.xs,
			name: "name",
			label: "name",
			xs: 12,
			required: true,
			group: 3,
		},
		{
			disabled: false,
			type: TFieldType.switch,
			image: false,
			size: TFieldSize.xs,
			name: "active",
			label: texts_a.active,
			required: false,
			xs: 12,
			group: 3,
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
			offset: {
				offsetAfterElement: { lg: 4 },
			},
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
			offset: { offsetAfterElement: { lg: 4 } },
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
