import * as Yup from "yup";
import { texts_e } from "services/localization/texts";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { PasswordRestoreFields } from "@/types/form/password-restore";
import { emailRegex } from "@/regex/email-regex";

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
