import { TFieldGroup, TFieldSize, TFieldType, TFormField } from "shared/form/types/bnt-form";
import { texts_b, texts_e } from "services/localization/texts";
import { texts_d } from "services/localization/texts/texts_d";
import { useModal } from "hooks/use-modal";
import { CommonStrings } from "constants/dictionary";
import { texts_p } from "services/localization/texts/texts_p";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_w } from "services/localization/texts/texts_w";
import { TTenant } from "@/types/model/tenant";

export const useTenantFormFields = () => {
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
			padding: { pt: 4 },
		},
		{
			id: 2,
			md: 5,
			lg: 5,
			xs: 12,
			padding: { pt: 4 },
		},
	];
	const fields: Array<TFormField<TTenant>> = [
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
			group: 2,
		},
		{
			image: false,
			size: TFieldSize.xs,
			name: "caption",
			label: "caption",
			xs: 12,
			required: true,
			group: 2,
		},
		{
			disabled: false,
			type: TFieldType.text,
			image: false,
			size: TFieldSize.xs,
			name: "domain",
			label: texts_d.domain,
			required: false,
			xs: 12,
			group: 2,
		},
		{
			disabled: false,
			type: TFieldType.number,
			image: false,
			size: TFieldSize.xs,
			name: "welcome_donuts",
			label: texts_w.welcome_donuts,
			required: true,
			xs: 12,
			sm: 6,
			lg: 4,
			group: 2,
		},
		{
			disabled: false,
			type: TFieldType.number,
			image: false,
			size: TFieldSize.xs,
			name: "welcome_points",
			label: texts_w.welcome_points,
			required: true,
			xs: 12,
			sm: 6,
			lg: 4,
			offset: {
				offsetAfterElement: {
					lg: 4,
				},
			},
			group: 2,
		},
		{
			disabled: false,
			type: TFieldType.number,
			image: false,
			size: TFieldSize.xs,
			name: "birthday_donuts",
			label: texts_b.birthday_donuts,
			required: false,
			xs: 12,
			sm: 6,
			lg: 4,
			group: 2,
		},
		{
			disabled: false,
			type: TFieldType.number,
			image: false,
			size: TFieldSize.xs,
			name: "birthday_points",
			label: texts_b.birthday_points,
			required: false,
			xs: 12,
			sm: 6,
			lg: 4,
			group: 2,
		},
		{
			disabled: false,
			type: TFieldType.switch,
			image: false,
			size: TFieldSize.xs,
			name: "email_notification",
			label: texts_e.email_notification,
			required: false,
			xs: 12,
			group: 2,
		},
	];

	return { fields, groups };
};
