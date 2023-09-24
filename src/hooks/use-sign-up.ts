import {
	PostRegisterApiArg,
	usePostRegisterMutation,
	usePostSendConfirmEmailMutation,
} from "services/api/bonuts-api";
import { useNotification } from "services/notification";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_c } from "services/localization/texts";
import { useProjectNavigate } from "hooks/use-project-navigate";

export const useSignUp = () => {
	const [postRegister, { isLoading: isPostingRegister, error: registerError }] =
		usePostRegisterMutation();
	const [sendEmail] = usePostSendConfirmEmailMutation();
	const { showNotification } = useNotification();
	const { translate } = useBntTranslate();
	const { navigateToLogin } = useProjectNavigate();

	const register = async (credentials: PostRegisterApiArg) => {
		const result = await postRegister(credentials);
		if (!Object.hasOwn(result, "error")) {
			showNotification(translate(texts_c.confirmation_email_was_sent_to, { capitalize: true }));
			navigateToLogin();
		}
	};

	const sendConfirmEmail = async (email: string) => {
		const result = await sendEmail({ body: { email } });
		if (!Object.hasOwn(result, "error")) {
			showNotification(translate(texts_c.confirmation_email_was_sent_to, { capitalize: true }));
			navigateToLogin();
		}
	};

	return { isPostingRegister, registerError, register, sendConfirmEmail };
};
