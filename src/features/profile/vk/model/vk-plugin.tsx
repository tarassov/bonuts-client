import { useRef } from "react";

import { emptyFunction } from "utils/empty-function";

import { useRegisterPlugin } from "@/entities/plugin";

import { authWindow } from "../lib/auth-window";
import { getVkAuthParams } from "../lib/get-vk-auth-params";

import { routesPath } from "routes/config/routes-path";

const NAME = "vk";

export function VkPlugin() {
	const onConnectRef = useRef<{ callback: (connected: boolean) => void }>({ callback: emptyFunction });

	useRegisterPlugin(NAME, {
		isConnected: () => {
			return false;
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

			const response = await promise;
			console.log("Response", response);
		},
	});

	return null;
}
