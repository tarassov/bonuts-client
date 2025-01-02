import { TFieldSize, TFieldType, TFormField } from "shared/ui/form/types/bnt-form";
import { Currency } from "constants/currency";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_c, texts_d, texts_t } from "services/localization/texts";

export type TransferFormType = { comment: string; amount: number; type: Currency };
export const useShareAllFormFields = () => {
	const { t } = useBntTranslate();
	const fields: Array<TFormField<TransferFormType>> = [
		{
			image: false,
			size: TFieldSize.xs,
			type: TFieldType.number,
			name: "amount",
			label: "amount",
			xs: 12,
			required: true,
		},
		{
			disabled: false,
			image: false,
			size: TFieldSize.xs,
			name: "comment",
			label: "comment",
			placeholder: "comment",
			type: TFieldType.textarea,
			required: true,
			xs: 12,
		},
		{
			image: false,
			required: true,
			size: TFieldSize.md,
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
			type: TFieldType.radio,
			xs: 12,
		},
	];

	return { fields };
};
