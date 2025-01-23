import {
	useGetUsersRecoverQuery,
	usePostRefreshTokenMutation,
	usePostUsersPasswordMutation,
	usePutUsersPasswordMutation,
} from "services/api/bonuts-api";
import { texts_c, texts_r } from "services/localization/texts";
import { useNotification } from "services/notification";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useProjectNavigate } from "hooks/use-project-navigate";
import { storage } from "shared/lib/localStorage";
import { AUTH_TOKEN } from "constants/auth-token";

export const usePasswordRecover = (token?: string) => {
	const [putPasswordRecover] = usePutUsersPasswordMutation();
	const [postPassword] = usePostUsersPasswordMutation();
	const [postRefreshToken] = usePostRefreshTokenMutation();

	const {
		data: user,
		isLoading,
		isError,
		isSuccess,
	} = useGetUsersRecoverQuery({ recoverToken: token }, { skip: !token });

	const { showNotification } = useNotification();
	const { navigateToRoot } = useProjectNavigate();
	const { setValue } = storage;
	const { translate } = useBntTranslate();
	const sendRecoverEmail = (email: string) => {
		putPasswordRecover({ body: { email } }).then((res) => {
			if ("data" in res) {
				showNotification(translate(texts_r.recover_email_has_been_sent, { capitalize: true }));
			}
		});
	};

	const changePassword = (password: string) => {
		if (token) {
			postPassword({ body: { password, recover_token: token } }).then((res) => {
				if ("data" in res) {
					showNotification(translate(texts_c.confirmed, { capitalize: true }));
					setValue<string>(AUTH_TOKEN, res.data.auth_token);
					postRefreshToken().finally(() => navigateToRoot());
				}
			});
		}
	};

	return { sendRecoverEmail, changePassword, isError, isLoading, user, isSuccess };
};
