import { useAppSelector } from "services/redux/store/store";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { tenantApi } from "services/api/extended/tenant-api";
import { PutTenantCurrentApiResponse } from "services/api/bonuts-api";
import { useNotification } from "services/notification";
import { texts_s } from "services/localization/texts";
import { TTenant } from "@/types/model/tenant";

export const useUpdateCurrentTenant = () => {
	const authTenant = useAppSelector(authTenantSelector);
	const [putTenant] = tenantApi.useUpdateCurrentTenantFormDataMutation();
	const { showNotification } = useNotification();

	const updateTenant = async (
		tenant: TTenant,
		options?: {
			onSuccess?: (args?: PutTenantCurrentApiResponse) => void;
		}
	) => {
		if (authTenant) {
			const { logo } = tenant;
			// @ts-ignore
			const logoNew: File | undefined =
				logo && !Object.getOwnPropertyDescriptor(logo, "url") ? logo : undefined;

			const res = await putTenant({
				body: { ...tenant, ...(logoNew && { logo: logoNew }), tenant: authTenant },
			});

			const result = { data: undefined, ...res };

			if (result.data) {
				options?.onSuccess?.(result.data);
				showNotification(texts_s.settings_updated);
			}

			return res;
		}
		return undefined;
	};

	return { updateTenant };
};
