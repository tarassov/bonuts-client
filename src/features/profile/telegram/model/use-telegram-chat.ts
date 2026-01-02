import { useGetTelegramChatQuery } from "@/features/profile/telegram/api/telegram-api";

export function useTelegramChat() {
	return useGetTelegramChatQuery();
}
