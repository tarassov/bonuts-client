import { useEffect, useRef } from "react";

import { GetTelegramChatApiResponse } from "services/api/bonuts-api";
import { present } from "shared/lib/type-guards";
import { emptyFunction } from "utils/empty-function";

import { useModal } from "@/entities/modal";
import { useRegisterPlugin } from "@/entities/plugin";

import { useTelegramChat } from "../model/use-telegram-chat";

const NAME = "Telegram";

export function TelegramPlugin() {
	const { data, isLoading } = useTelegramChat();
	const { ConnectTelegramModal } = useModal();
	const onConnectRef = useRef<{ callback: (connected: boolean) => void }>({ callback: emptyFunction });
	const dataRef = useRef<{ data?: GetTelegramChatApiResponse }>({ data: undefined });

	useEffect(() => {
		dataRef.current.data = data;

		if (!isLoading && data) {
			if (present(onConnectRef.current.callback)) onConnectRef.current.callback(present(data) && present(data.chat_id));
		}
	}, [isLoading, data]);

	useRegisterPlugin(NAME, {
		isConnected: () => {
			return present(dataRef.current.data) && present(dataRef.current.data.chat_id);
		},
		onConnectChange: (callback: (connected: boolean) => void) => {
			onConnectRef.current = { callback };
		},
		connect: () => {
			return ConnectTelegramModal.show();
		},
	});

	return null;
}
