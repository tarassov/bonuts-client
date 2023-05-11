import { usePostRequestsMutation } from "services/api/bonuts-api";
import { useAppSelector } from "services/redux/store/store";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { TDonut } from "@/types/model";

export const useRequestLogic = () => {
	const authTenant = useAppSelector(authTenantSelector);
	const [postRequest] = usePostRequestsMutation();

	const createRequest = (args: { donut: TDonut }) => {
		const { donut } = args;
		if (authTenant) {
			postRequest({
				body: { donut_id: donut?.id, tenant: authTenant },
			});
		}
	};

	return { createRequest };
};
