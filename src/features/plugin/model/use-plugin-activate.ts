import { useCallback } from "react";

import { texts_s } from "services/localization/texts";
import { useNotification } from "services/notification";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { useAppSelector } from "services/redux/store/store";

import {
	usePostPluginsByIdActivateMutation,
	usePostPluginsByIdDeactivateMutation,
} from "@/entities/plugin";

export function usePluginActivate() {
	const [activatePlugin] = usePostPluginsByIdActivateMutation();
	const [deactivatePlugin] = usePostPluginsByIdDeactivateMutation();
	const authTenant = useAppSelector(authTenantSelector);
	const { showNotification } = useNotification();

	const setActivatePlugin = useCallback(
		(id: number, active: boolean) => {
			const apiCall = active ? activatePlugin : deactivatePlugin;
			if (authTenant) {
				apiCall({ id, tenant: authTenant })
					.unwrap()
					.then(() => {
						showNotification(texts_s.settings_updated);
					});
			}
		},
		[activatePlugin, authTenant, deactivatePlugin, showNotification]
	);

	return { setActivatePlugin };
}
