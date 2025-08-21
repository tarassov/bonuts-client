import { PostAvatarsApiResponse } from "services/api/bonuts-api";
import { avatarApi } from "services/api/extended/avatar-api";
import { texts_u } from "services/localization/texts/texts_u";
import { useNotification } from "services/notification";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { useAppSelector } from "services/redux/store/store";

export const useUpdateAvatar = () => {
	const authTenant = useAppSelector(authTenantSelector);
	const [postAvatarApi] = avatarApi.useUpdateAvatarsMutation();
	const { showNotification } = useNotification();

	const postAvatar = async (
		args: { id: number; file: File },
		options?: {
			onSuccess?: (args?: PostAvatarsApiResponse) => void;
		}
	) => {
		const { id, file } = args;
		if (authTenant) {
			const res = await postAvatarApi({ body: { id, uploaded_image: file, tenant: authTenant } });

			const result = { data: undefined, ...res };

			if (result.data) {
				options?.onSuccess?.(result.data);
				showNotification(texts_u.updated);
			}

			return res;
		}
		return undefined;
	};

	return { postAvatar };
};
