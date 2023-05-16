import { usePostRequestsMutation } from "services/api/bonuts-api";
import { useAppSelector } from "services/redux/store/store";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { useNotification } from "services/notification/use-notification";
import { texts_r } from "services/localization/texts/texts_r";
import { TDonut } from "@/types/model";

export const useRequestLogic = () => {
	const authTenant = useAppSelector(authTenantSelector);
	const [postRequest] = usePostRequestsMutation();
	const { showNotification } = useNotification();

	const createRequest = async (args: { donut: TDonut }) => {
		const { donut } = args;
		if (authTenant) {
			postRequest({
				body: { donut_id: donut?.id, tenant: authTenant },
			})
				.unwrap()
				.then(() => showNotification(texts_r.request_added));
		}
	};

	return { createRequest };
};
