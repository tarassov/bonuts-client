import { CommonStrings } from "constants/dictionary";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_e, texts_l, texts_n, texts_s } from "services/localization/texts";
import { texts_d } from "services/localization/texts/texts_d";
import { texts_o } from "services/localization/texts/texts_o";
import { texts_p } from "services/localization/texts/texts_p";

import { useModal } from "@/shared/lib/modal";
import { FieldSize, FieldType, TFormField } from "@/shared/ui/form";

import type { TDonut } from "@/types/model";

export const useDonutEditFormFields = (onImageChange?: (file: File) => void) => {
	const { ImageModal } = useModal();
	const { t } = useBntTranslate();

	const onClick = (url?: string) => {
		ImageModal.show({
			url: url || CommonStrings.EMPTY_STRING,
			title: t(texts_p.preview, { capitalize: true }),
		});
	};
	const fields: Array<TFormField<TDonut>> = [
		{
			image: true,
			size: FieldSize.xs,
			name: "logo",
			label: texts_l.logo,
			type: FieldType.imageUpload,
			xs: 12,
			md: 12,
			group: 11,
			onClick: (value) => onClick(value?.toString()),
			onImageChange,
		},
		{
			image: false,
			size: FieldSize.xs,
			name: "name",
			label: texts_n.name,
			xs: 12,
			required: true,
			group: 21,
		},
		{
			disabled: false,
			type: FieldType.switch,
			image: false,
			size: FieldSize.xs,
			name: "use_remains",
			label: texts_l.limit_stock,
			disabledLabel: texts_s.stock_is_unlimited,
			required: false,
			xs: 12,
			group: 22,
		},
		{
			disabled: false,
			type: FieldType.number,
			image: false,
			size: FieldSize.xs,
			name: "price",
			label: texts_p.price,
			required: true,
			xs: 12,
			sm: 6,
			lg: 6,
			group: 21,
		},
		{
			disabled: false,
			type: FieldType.date,
			image: false,
			size: FieldSize.xs,
			name: "expiration_date",
			label: texts_e.expiration_date,
			required: false,
			xs: 12,
			sm: 6,
			lg: 6,
			group: 21,
		},
		{
			disabled: false,
			type: FieldType.number,
			image: false,
			size: FieldSize.xs,
			name: "on_stock",
			label: texts_o.on_stock,
			required: false,
			xs: 12,
			md: 6,
			lg: 6,
			group: 22,
			minValue: 0,
		},
		{
			disabled: false,
			type: FieldType.number,
			image: false,
			size: FieldSize.xs,
			name: "supply_days",
			label: texts_d.delivery_days,
			required: false,
			xs: 12,
			md: 6,
			lg: 6,
			group: 22,
			minValue: 0,
		},
		{
			disabled: false,
			type: FieldType.textarea,
			image: false,
			size: FieldSize.xs,
			name: "description",
			label: texts_d.description,
			required: false,
			xs: 12,
			lg: 12,
			group: 21,
		},
	];

	return { fields };
};
