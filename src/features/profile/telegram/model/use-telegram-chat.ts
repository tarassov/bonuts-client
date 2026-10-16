import { useGetTelegramChatQuery } from "../api/telegram-api";

export function useTelegramChat() {
	return useGetTelegramChatQuery();
}
