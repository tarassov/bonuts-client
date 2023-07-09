import { PostCirclesApiResponse, usePostCirclesMutation } from "services/api/bonuts-api";
import { useCurrentTenant } from "logic/hooks/tenant/use-current-tenant";
import { useNotification } from "services/notification";
import { texts_c } from "services/localization/texts";

export const useCreateCircle = () => {
	const [postCircle] = usePostCirclesMutation();
	const tenant = useCurrentTenant();
	const { showNotification } = useNotification();

	const createCircle = (
		name: string,
		options?: { onSuccess?: (result: PostCirclesApiResponse) => void }
	) => {
		if (tenant) {
			postCircle({ body: { tenant, name } })
				.unwrap()
				.then((result) => {
					options?.onSuccess?.(result);
					showNotification(texts_c.created);
				});
		} else {
			throw new Error("empty tenant");
		}
	};
	return { createCircle };
};
