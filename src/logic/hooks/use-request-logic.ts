import { usePostRequestsMutation } from "../../services/api/bonuts-api";

import { useAppSelector } from "../../services/store/store";
import { authTenantSelector } from "../../services/redux/auth-slice";
import { TDonut } from "../../types/model";

export const useRequestLogic = (id?: string | null) => {
	const authTenant = useAppSelector(authTenantSelector);
	const [postRequest] = usePostRequestsMutation();

	const createRequest = (args: { donut: TDonut }) => {
		const { donut } = args;
		authTenant &&
			postRequest({
				body: { donut_id: donut?.id, tenant: authTenant },
			});
	};

	return { createRequest };
};
