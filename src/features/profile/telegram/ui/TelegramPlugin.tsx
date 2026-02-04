import { useEffect, useRef } from "react";
import { present } from "shared/lib/type-guards";

import { useModal } from "@/entities/modal";
import { useRegisterPlugin } from "@/entities/plugin";

import { useTelegramChat } from "../model/use-telegram-chat";

const NAME = "Telegram";

export function TelegramPlugin() {
	const { data, isLoading } = useTelegramChat();
	const { ConnectTelegramModal } = useModal();
	const onConnectRef = useRef<(connected: boolean) => void>();

	useEffect(() => {
		if (!isLoading && data) {
			if (present(onConnectRef.current)) onConnectRef.current(present(data) && present(data.chat_id));
		}
	}, [isLoading, data]);

	useRegisterPlugin(NAME, {
		isConnected: () => {
			return present(data) && present(data.chat_id);
		},
		onConnectChange: (callback: (connected: boolean) => void) => {
			onConnectRef.current = callback;
		},
		connect: () => {
			return ConnectTelegramModal.show();
		},
	});

	return null;
}
