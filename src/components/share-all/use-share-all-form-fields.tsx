import { FieldSize, FieldType, TFormField } from "shared/ui/form/types/bnt-form";

import { Currency } from "constants/currency";

import { texts_c, texts_d, texts_t } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";

export type TransferFormType = { comment: string; amount: number; type: Currency };
export const useShareAllFormFields = () => {
	const { t } = useBntTranslate();
	const fields: Array<TFormField<TransferFormType>> = [
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
			placeholder: "comment",
			type: FieldType.textarea,
			required: true,
			xs: 12,
		},
		{
			image: false,
			required: true,
			size: FieldSize.md,
			name: "type",
			label: t(texts_t.transfer_type, { capitalize: true }),
			source: [
				{
					key: Currency.donut,
					label: t(texts_d.donuts),
				},
				{
					key: Currency.coin,
					label: t(texts_c.coins),
				},
			],
			type: FieldType.radio,
			xs: 12,
		},
	];

	return { fields };
};
