import { bonutsApiOverride } from "services/api/injected-api";

export const telegramApi = bonutsApiOverride.enhanceEndpoints({
	addTagTypes: ["Telegram"],
	endpoints: {
		getTelegramChat: { providesTags: ["Telegram"] },
	},
});
export const { useGetTelegramChatQuery } = telegramApi;
