import { useCallback, useState } from "react";
import { push } from "redux-first-history";

import { BntRoutes } from "@/shared/config/routes";
import { useAuth } from "@/shared/model/auth";
import { useLoader } from "@/shared/ui/loader";
import { useNotification } from "@/shared/ui/notification";

import { tenantsApi } from "@/entities/tenant";

import { routesPath } from "@/routes/config/routes-path";
import { useAppDispatch } from "@/services/redux/store/store";
import type { TTenant } from "@/types/model/tenant";

const OPERATION_NAME = "joinTenant";

export const useJoinTenant = () => {
	const dispatch = useAppDispatch();
	const [joinTenantMutation] = tenantsApi.usePostTenantsByTenantNameJoinMutation();
	const [joiningTenantId, setJoiningTenantId] = useState<number>();
	const { setTenant } = useAuth();
	const { openLoader, closeLoader } = useLoader(OPERATION_NAME);
	const { showResponseError } = useNotification();

	const joinTenant = useCallback(
		async (tenant: TTenant) => {
			setJoiningTenantId(tenant.id);
			openLoader();

			try {
				await joinTenantMutation({ tenantName: tenant.name }).unwrap();
				await setTenant(tenant.name);
				dispatch(push(routesPath[BntRoutes.Dashboard]));
			} catch (error) {
				showResponseError(error);
			} finally {
				setJoiningTenantId(undefined);
				closeLoader();
			}
		},
		[closeLoader, dispatch, joinTenantMutation, openLoader, setTenant, showResponseError]
	);

	return { joiningTenantId, joinTenant };
};
