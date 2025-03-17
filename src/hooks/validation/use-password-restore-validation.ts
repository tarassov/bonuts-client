import * as Yup from "yup";

import { emailRegex } from "shared/lib/regex/email-regex";

import { texts_e } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { PasswordRestoreFields } from "@/types/form/password-restore";

export const usePasswordRestoreValidation = () => {
	const { translate } = useBntTranslate();
	const formSchema = Yup.object<PasswordRestoreFields>().shape({
		email: Yup.string()
			.required(translate(texts_e.email_address_must_be_valid, { capitalize: true }))
			.matches(emailRegex, translate(texts_e.email_address_must_be_valid, { capitalize: true }))
			.email(translate(texts_e.email_address_must_be_valid, { capitalize: true })),
	});

	return { formSchema };
};
