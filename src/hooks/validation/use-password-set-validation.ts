import * as Yup from "yup";
import { texts_p } from "services/localization/texts";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { PasswordSetFields } from "@/types/form/password-set";

export const usePasswordSetValidation = () => {
	const { translate } = useBntTranslate();
	const formSchema = Yup.object<PasswordSetFields>().shape({
		password: Yup.string().required(translate(texts_p.password_is_required, { capitalize: true })),
		// .min(4, "Password length should be at least 4 characters")
		// .max(12, "Password cannot exceed more than 12 characters"),
		passwordRepeat: Yup.string()
			.required(translate(texts_p.password_confirm_is_required, { capitalize: true }))
			// .min(4, "Password length should be at least 4 characters")
			// .max(12, "Password cannot exceed more than 12 characters")
			.oneOf([Yup.ref("password")], translate(texts_p.passwords_do_not_math, { capitalize: true })),
	});

	return { formSchema };
};
