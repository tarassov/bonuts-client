import { useEffect, useRef } from "react";

import { GetVkMeApiResponse } from "services/api/bonuts-api";
import { present } from "shared/lib/type-guards";
import { emptyFunction } from "utils/empty-function";

import { useCurrentProfile } from "@/shared/model/auth";

import { useRegisterPlugin } from "@/entities/plugin";

import { useDeleteVkDisconnectMutation } from "../api/vk-api";
import { authWindow } from "../lib/auth-window";

import { useVkUser } from "./use-vk-user";
import { routesPath } from "routes/config/routes-path";

const NAME = "vk";

export function VkPlugin() {
	const { user, isLoading } = useVkUser();
	const { authTenant, profile } = useCurrentProfile();
	const [deleteVkDisconnect] = useDeleteVkDisconnectMutation();
	const onConnectRef = useRef<{ callback: (connected: boolean) => void }>({ callback: emptyFunction });
	const dataRef = useRef<{ user?: GetVkMeApiResponse }>({ user: undefined });

	useEffect(() => {
		dataRef.current.user = user;

		if (!isLoading && user) {
			if (present(onConnectRef.current.callback)) onConnectRef.current.callback(present(user.vk_user_id));
		}
	}, [isLoading, user]);

	useRegisterPlugin(NAME, {
		isConnected: () => {
			return present(dataRef.current.user) && present(dataRef.current.user.vk_user_id);
		},
		onConnectChange: (callback: (connected: boolean) => void) => {
			onConnectRef.current = { callback };
		},
		connect: async () => {
			const promise = new Promise((resolve) => {
				authWindow(routesPath.VkCallback, (response) => {
					resolve(response);
				});
			});

			await promise;
			if (present(onConnectRef.current.callback)) onConnectRef.current.callback(true);
		},
		disconnect: async () => {
			await deleteVkDisconnect({ tenant: authTenant || undefined, userId: profile?.id }).unwrap();

			if (present(onConnectRef.current.callback)) onConnectRef.current.callback(false);
		},
	});

	return null;
}
