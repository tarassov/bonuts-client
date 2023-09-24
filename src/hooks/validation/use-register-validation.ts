import * as Yup from "yup";
import { texts_e, texts_f, texts_l, texts_p } from "services/localization/texts";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { RegisterFields } from "@/types/form/register";

export const useRegisterValidation = () => {
	const { translate } = useBntTranslate();
	const formSchema = Yup.object<RegisterFields>().shape({
		password: Yup.string().required(translate(texts_p.password_is_required, { capitalize: true })),
		// .min(4, "Password length should be at least 4 characters")
		// .max(12, "Password cannot exceed more than 12 characters"),
		passwordRepeat: Yup.string()
			.required(translate(texts_p.password_confirm_is_required, { capitalize: true }))
			// .min(4, "Password length should be at least 4 characters")
			// .max(12, "Password cannot exceed more than 12 characters")
			.oneOf([Yup.ref("password")], translate(texts_p.passwords_do_not_math)),
		first_name: Yup.string().required(translate(texts_f.first_name)),
		last_name: Yup.string().required(translate(texts_l.last_name)),
		email: Yup.string()
			.required(translate(texts_e.email_address))
			.email(translate(texts_e.email_address)),
	});

	return { formSchema };
};
