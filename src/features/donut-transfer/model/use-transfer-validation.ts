import * as Yup from "yup";

import { present } from "@/shared/lib/type-guards";

import type { TTransferForm } from "./use-transfer-form-fields";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_c, texts_m } from "@/services/localization/texts";

export const MIN_TRANSFER_COMMENT_LENGTH = 10;

export const useTransferValidation = (maxAmount?: number) => {
	const { translate } = useBntTranslate();
	const formSchema = Yup.object<TTransferForm>().shape({
		amount: present(maxAmount)
			? Yup.number()
					.transform((val, orig) => (orig === "" ? undefined : val))
					.required(translate("Required"))
					.nullable()
					.min(1, `${translate(texts_m.min_amount_is, { capitalize: true })} ${1}`)
					.max(maxAmount, `${translate(texts_m.max_amount_is, { capitalize: true })} ${maxAmount}`)
			: Yup.number().min(1),
		comment: Yup.string()
			.trim()
			.required(translate(texts_c.comment_is_required, { capitalize: true }))
			.min(MIN_TRANSFER_COMMENT_LENGTH, translate(texts_c.comment_min_length, { min: MIN_TRANSFER_COMMENT_LENGTH })),
	});

	return { formSchema };
};
