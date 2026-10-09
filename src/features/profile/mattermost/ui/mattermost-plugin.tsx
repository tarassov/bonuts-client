import { useRef } from "react";

import { useIcons } from "hooks/use-icons";
import { emptyFunction } from "utils/empty-function";

import { useRegisterPlugin } from "@/entities/plugin";

const NAME = "Mattermost";

export function MattermostPlugin() {
	const { Mattermost } = useIcons({ width: "30px", height: "30px", variant: "primary" });
	const onConnectRef = useRef<{ callback: (connected: boolean) => void }>({ callback: emptyFunction });

	useRegisterPlugin(NAME, {
		isConnected: () => true,
		onConnectChange: (callback: (connected: boolean) => void) => {
			onConnectRef.current = { callback };
			callback(true);
		},
		connect: async () => {
			onConnectRef.current.callback(true);
		},
		icon: <Mattermost />,
		hideName: false,
	});

	return null;
}
