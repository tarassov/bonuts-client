import { useRef } from "react";

import { present } from "shared/lib/type-guards";
import { emptyFunction } from "utils/empty-function";

import { useRegisterPlugin } from "@/entities/plugin";

import { authWindow } from "@/features/profile/ vk/lib/auth-window";

import * as VKID from "@vkid/sdk";

const NAME = "vk";

VKID.Config.init({
	app: 54457672,
	redirectUrl: "https://develop.bonuts.ru/oauth/vk",
	state: "state",
	codeVerifier: "codeVerifier",
	scope: "phone email",
});

export function VkPlugin() {
	const onConnectRef = useRef<{ callback: (connected: boolean) => void }>({ callback: emptyFunction });

	useRegisterPlugin(NAME, {
		isConnected: () => {
			return false;
		},
		onConnectChange: (callback: (connected: boolean) => void) => {
			onConnectRef.current = { callback };
		},
		connect: () => {
			return VKID.Auth.login();

			// return new Promise((resolve, reject) => {
			// 	authWindow("https://localhost:3002", (response) => {
			// 		resolve(present(response.accessToken));
			// 	});
			// });
		},
	});

	return null;
}
