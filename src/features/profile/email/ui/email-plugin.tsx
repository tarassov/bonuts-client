import { useRef } from "react";

import { useIcons } from "hooks/use-icons";
import { emptyFunction } from "utils/empty-function";

import { useRegisterPlugin } from "@/entities/plugin";

const NAME = "Email";

export function EmailPlugin() {
	const { Email } = useIcons({ width: "30px", height: "30px", variant: "primary" });
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
		icon: <Email />,
		hideName: false,
	});

	return null;
}
