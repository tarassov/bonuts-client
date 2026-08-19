import { useModal } from "@/shared/lib/modal";
import type { TFormField } from "@/shared/ui/form";
import { FieldSize, FieldType } from "@/shared/ui/form";

import { CommonStrings } from "@/constants/dictionary";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_b, texts_d, texts_e, texts_l, texts_p, texts_t, texts_w } from "@/services/localization/texts";
import type { TTenant } from "@/types/model/tenant";

export function useTenantSettingsFormFields() {
	const { ImageModal } = useModal();
	const { t } = useBntTranslate();

	const onClick = (url?: string) => {
		ImageModal.show({
			url: url || CommonStrings.EMPTY_STRING,
			title: t(texts_p.preview, { capitalize: true }),
		});
	};
	const fields: Array<TFormField<TTenant>> = [
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
		},
		{
			image: false,
			readOnly: true,
			size: FieldSize.xs,
			name: "name",
			label: texts_t.team_identifier,
			xs: 12,
			required: true,
			group: 12,
		},
		{
			image: false,
			size: FieldSize.xs,
			name: "caption",
			label: texts_t.team_name,
			xs: 12,
			required: true,
			group: 12,
		},
		{
			disabled: false,
			image: false,
			size: FieldSize.xs,
			name: "domain",
			label: texts_d.domain,
			required: false,
			xs: 12,
			group: 12,
		},
		{
			disabled: false,
			type: FieldType.number,
			image: false,
			size: FieldSize.xs,
			name: "welcome_donuts",
			label: texts_w.welcome_donuts,
			required: true,
			xs: 12,
			sm: 6,
			lg: 6,
			group: 2,
		},
		{
			disabled: false,
			type: FieldType.number,
			image: false,
			size: FieldSize.xs,
			name: "welcome_points",
			label: texts_w.welcome_points,
			required: true,
			xs: 12,
			sm: 6,
			lg: 6,
			group: 2,
		},
		{
			disabled: false,
			type: FieldType.number,
			image: false,
			size: FieldSize.xs,
			name: "birthday_donuts",
			label: texts_b.birthday_donuts,
			required: false,
			xs: 12,
			sm: 6,
			lg: 6,
			group: 3,
		},
		{
			disabled: false,
			type: FieldType.number,
			image: false,
			size: FieldSize.xs,
			name: "birthday_points",
			label: texts_b.birthday_points,
			required: false,
			xs: 12,
			sm: 6,
			lg: 6,
			group: 3,
		},
		{
			disabled: false,
			type: FieldType.switch,
			image: false,
			size: FieldSize.xs,
			name: "email_notification",
			label: texts_e.email_notification,
			required: false,
			xs: 12,
			group: 3,
		},
		{
			disabled: false,
			type: FieldType.textarea,
			image: false,
			size: FieldSize.xs,
			name: "birthday_message",
			label: texts_b.birthday_message,
			required: false,
			xs: 12,
			minRows: 3,
			maxRows: 5,
			group: 3,
		},
	];

	return { fields };
}
