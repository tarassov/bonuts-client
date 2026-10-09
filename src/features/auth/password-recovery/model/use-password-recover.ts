import { AUTH_TOKEN } from "constants/auth-token";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useProjectNavigate } from "hooks/use-project-navigate";
import { useGetUsersRecoverQuery, usePostRefreshTokenMutation, usePostUsersPasswordMutation, usePutUsersPasswordMutation } from "services/api/bonuts-api";
import { texts_c, texts_r } from "services/localization/texts";

import { storage } from "@/shared/lib/localStorage";
import { isBlank } from "@/shared/lib/type-guards";
import { useAuth } from "@/shared/model/auth";
import { useNotification } from "@/shared/ui/notification";

export const usePasswordRecover = (token?: string) => {
	const [putPasswordRecover] = usePutUsersPasswordMutation();
	const [postPassword] = usePostUsersPasswordMutation();
	const [postRefreshToken] = usePostRefreshTokenMutation();
	const { showResponseError } = useNotification();
	const { checkAuth } = useAuth();

	const { data: user, isLoading, isError, isSuccess } = useGetUsersRecoverQuery({ recoverToken: token }, { skip: !token });

	const { showNotification } = useNotification();
	const { navigateToRoot } = useProjectNavigate();
	const { setValue } = storage;
	const { translate } = useBntTranslate();
	const sendRecoverEmail = async (email: string) => {
		try {
			await putPasswordRecover({ body: { email } }).unwrap();
			showNotification(translate(texts_r.recover_email_has_been_sent, { capitalize: true }));
		} catch (e) {
			showResponseError(e);
		}
	};

	const changePassword = async (password: string) => {
		if (isBlank(token)) return;

		try {
			const res = await postPassword({ body: { password, recover_token: token } }).unwrap();
			const authToken = res.auth_token;
			setValue<string | undefined>(AUTH_TOKEN, authToken);
			const isAuthenticated = await checkAuth();
			showNotification(translate(texts_c.confirmed, { capitalize: true }));
			await postRefreshToken().unwrap();
			if (isAuthenticated) navigateToRoot();
		} catch (e) {
			showResponseError(e);
		}
	};

	return { sendRecoverEmail, changePassword, isError, isLoading, user, isSuccess };
};
