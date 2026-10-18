import { storage } from "@/shared/lib/localStorage";

export enum VKAuthFlow {
	Connect = "connect",
	Login = "login",
}

const VK_AUTH_FLOW_KEY = "vk-auth-flow";

export function setVkAuthFlow(flow: VKAuthFlow) {
	storage.setValue<string>(VK_AUTH_FLOW_KEY, flow);
}

export function getVkAuthFlow() {
	return storage.getValue(VK_AUTH_FLOW_KEY) === VKAuthFlow.Login ? VKAuthFlow.Login : VKAuthFlow.Connect;
}

export function clearVkAuthFlow() {
	storage.setValue<string | undefined>(VK_AUTH_FLOW_KEY, undefined);
}
