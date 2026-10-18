import { authWindow, TAuthResponse } from "./auth-window";
import { setVkAuthFlow, VKAuthFlow } from "./vk-auth-flow";
import { routesPath } from "routes/config/routes-path";

function openVkAuthWindow(flow: VKAuthFlow, callback: (response: TAuthResponse) => void) {
	setVkAuthFlow(flow);
	authWindow(routesPath.VkCallback, callback);
}

export function openVkConnectWindow(callback: (response: TAuthResponse) => void) {
	openVkAuthWindow(VKAuthFlow.Connect, callback);
}

export function openVkLoginWindow(callback: (response: TAuthResponse) => void) {
	openVkAuthWindow(VKAuthFlow.Login, callback);
}
