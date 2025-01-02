import {
	useGetConfirmEmailQuery,
	usePostConfirmEmailMutation,
	usePostRefreshTokenMutation,
} from "services/api/bonuts-api";
import { useNotification } from "services/notification";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_c } from "services/localization/texts";
import { useProjectNavigate } from "hooks/use-project-navigate";
import { useStorage } from "shared/lib/localStorage/use-storage";

export const useConfirmEmail = (token?: string) => {
	const { data, isLoading } = useGetConfirmEmailQuery({ token }, { skip: !token });
	const [postConfirm] = usePostConfirmEmailMutation();
	const [postRefreshToken] = usePostRefreshTokenMutation();
	const { showNotification } = useNotification();
	const { translate } = useBntTranslate();
	const { navigateToRoot } = useProjectNavigate();
	const { setValue } = useStorage();

	const confirm = () => {
		if (token) {
			postConfirm({ body: { token } }).then((res) => {
				if ("data" in res) {
					showNotification(translate(texts_c.confirmed, { capitalize: true }));
					setValue<string>("auth_token", res.data.auth_token);
					postRefreshToken().finally(() => navigateToRoot());
				}
			});
		}
	};

	return { confirm, user: data?.data, isLoading };
};
