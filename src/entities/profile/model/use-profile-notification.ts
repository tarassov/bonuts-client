import { useCallback } from "react";

import { useAuthTenant } from "shared/model/auth";

import { profilesApi } from "../api/profiles-api";

export function useProfileNotification(pluginId: number) {
	const { usePostProfileNotificationsByIdActivateMutation, usePostProfileNotificationsByIdDeactivateMutation } = profilesApi;
	const [activate, { isLoading: isActivating }] = usePostProfileNotificationsByIdActivateMutation();
	const [deactivate, { isLoading: isDeactivating }] = usePostProfileNotificationsByIdDeactivateMutation();
	const tenant = useAuthTenant();

	const activatePlugin = useCallback(() => {
		if (tenant) activate({ id: pluginId, body: { tenant } });
	}, [activate, pluginId, tenant]);

	const deactivatePlugin = useCallback(() => {
		if (tenant) deactivate({ id: pluginId, body: { tenant } });
	}, [deactivate, pluginId, tenant]);

	return { activatePlugin, deactivatePlugin, isLoading: isActivating || isDeactivating || false };
}
