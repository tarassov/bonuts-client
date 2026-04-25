import { PostCirclesApiResponse } from "services/api/bonuts-api";
import { circlesApi } from "services/api/extended/circles-api";
import { texts_c } from "services/localization/texts";

import { TFormValue } from "@/shared/ui/form";
import { useNotification } from "@/shared/ui/notification";

import { useCurrentTenant } from "logic/hooks/tenant/use-current-tenant";

export const useCreateCircle = () => {
	const { usePostCirclesMutation } = circlesApi;
	const [postCircle] = usePostCirclesMutation();
	const tenant = useCurrentTenant();
	const { showNotification } = useNotification();

	const createCircle = (args: Record<string, TFormValue>, options?: { onSuccess?: (result: PostCirclesApiResponse) => void }) => {
		const { name } = args;
		if (tenant && name) {
			postCircle({ body: { tenant, name: name.toString() } })
				.unwrap()
				.then((result) => {
					options?.onSuccess?.(result);
					showNotification(texts_c.created);
				});
		} else {
			throw new Error("empty tenant or name");
		}
	};
	return { createCircle };
};
