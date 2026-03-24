import * as Yup from "yup";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_e, texts_p } from "services/localization/texts";
import { emailRegex } from "shared/lib/regex/email-regex";

import type { TLoginFields } from "@/types/form/login";

export const useLoginValidation = () => {
	const { translate } = useBntTranslate();

	const formSchema = Yup.object<TLoginFields>().shape({
		email: Yup.string()
			.required(translate(texts_e.email_address_is_required, { capitalize: true }))
			.matches(emailRegex, translate(texts_e.email_address_must_be_valid, { capitalize: true }))
			.email(translate(texts_e.email_address_must_be_valid, { capitalize: true })),
		password: Yup.string().required(translate(texts_p.password_is_required, { capitalize: true })),
	});

	return { formSchema };
};
