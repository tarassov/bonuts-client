import type { PutTenantCurrentApiResponse } from "services/api/bonuts-api";
import { texts_s } from "services/localization/texts";
import { useAppSelector } from "services/redux/store/store";

import { authTenantSelector } from "@/shared/model/auth";
import { useNotification } from "@/shared/ui/notification";

import { tenantsApi } from "@/entities/tenant";

import type { TTenant } from "@/types/model/tenant";

export type TUpdateTenantValues = Omit<TTenant, "logo"> & {
	logo: TTenant["logo"] | File;
};

export const useUpdateCurrentTenant = () => {
	const authTenant = useAppSelector(authTenantSelector);
	const [putTenant, { isLoading: isUpdating }] = tenantsApi.useUpdateCurrentTenantFormDataMutation();
	const { showNotification } = useNotification();

	const updateTenant = async (
		tenant: TUpdateTenantValues,
		options?: {
			onSuccess?: (args?: PutTenantCurrentApiResponse) => void;
		}
	) => {
		if (authTenant) {
			const { logo, ...tenantValues } = tenant;
			const logoNew = logo instanceof File ? logo : undefined;

			const res = await putTenant({
				body: { ...tenantValues, ...(logoNew && { logo: logoNew }), tenant: authTenant },
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

	return { isUpdating, updateTenant };
};
