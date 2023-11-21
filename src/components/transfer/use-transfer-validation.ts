import { useBntTranslate } from "hooks/use-bnt-translate";
import * as Yup from "yup";
import { TransferFormType } from "components/transfer/use-transfer-form-fields";
import { texts_m } from "services/localization/texts";

export const useTransferValidation = (maxAmount?: number) => {
	const { translate } = useBntTranslate();
	const formSchema = Yup.object<TransferFormType>().shape({
		amount: maxAmount
			? Yup.number()
					.transform((val, orig) => (orig === "" ? undefined : val))
					.required(translate("Required"))
					.nullable()
					.min(1, `${translate(texts_m.min_amount_is, { capitalize: true })} ${1}`)
					.max(maxAmount, `${translate(texts_m.max_amount_is, { capitalize: true })} ${maxAmount}`)
			: Yup.number().min(1),
		comment: Yup.string().required(translate("Required")),
	});

	return { formSchema };
};
