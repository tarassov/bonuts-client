import { useCallback } from "react";

import { texts_s } from "services/localization/texts";
import { useNotification } from "services/notification";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { useAppSelector } from "services/redux/store/store";

import { usePatchPluginsByIdMutation } from "@/entities/plugin";
import { TPlugin } from "@/types/model";

export function usePluginUpdate() {
	const [patchPluginsById] = usePatchPluginsByIdMutation();
	const authTenant = useAppSelector(authTenantSelector);
	const { showNotification } = useNotification();

	const updatePlugin = useCallback(
		async (plugin: TPlugin) => {
			const { id, settings } = plugin;

			if (!settings) return;

			if (authTenant) {
				const request = patchPluginsById({
					id,
					body: { plugin_settings: settings, tenant: authTenant },
				});
				await request.unwrap();
				showNotification(texts_s.settings_updated);
			}
		},
		[authTenant, patchPluginsById, showNotification]
	);

	return { updatePlugin };
}
