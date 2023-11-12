import { useBntTranslate } from "hooks/use-bnt-translate";
import * as Yup from "yup";
import { texts_e, texts_f, texts_l } from "services/localization/texts";
import { RegisterFields } from "@/types/form/register";
import { emailRegex } from "@/regex/email-regex";

export const useUserValidation = () => {
	const { translate } = useBntTranslate();
	const formSchema = Yup.object<RegisterFields>().shape({
		first_name: Yup.string().required(translate(texts_f.first_name)),
		last_name: Yup.string().required(translate(texts_l.last_name)),
		email: Yup.string()
			.required(translate(texts_e.email_address_must_be_valid, { capitalize: true }))
			.matches(emailRegex, translate(texts_e.email_address_must_be_valid, { capitalize: true }))
			.email(translate(texts_e.email_address_must_be_valid, { capitalize: true })),
	});

	return { formSchema };
};
