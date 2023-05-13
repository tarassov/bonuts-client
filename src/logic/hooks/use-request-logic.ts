import { usePostRequestsMutation } from "services/api/bonuts-api";
import { useAppSelector } from "services/redux/store/store";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { useNotification } from "logic/hooks/use-notification";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { TDonut } from "@/types/model";

export const useRequestLogic = () => {
	const authTenant = useAppSelector(authTenantSelector);
	const [postRequest] = usePostRequestsMutation();
	const { showNotification } = useNotification();
	const { t } = useBntTranslate();

	const createRequest = async (args: { donut: TDonut }) => {
		const { donut } = args;
		if (authTenant) {
			const result = await postRequest({
				body: { donut_id: donut?.id, tenant: authTenant },
			}).unwrap();
			if (result) {
				showNotification(t("request added"));
			}
		}
	};

	return { createRequest };
};
