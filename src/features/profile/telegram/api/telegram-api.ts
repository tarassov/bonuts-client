import { bonutsApiOverride } from "services/api/injected-api";

export const telegramApi = bonutsApiOverride.enhanceEndpoints({
	addTagTypes: ["Telegram", "Notifications"],
	endpoints: {
		getTelegramChat: { providesTags: ["Telegram"] },
		postProfileNotificationsByIdActivate: { invalidatesTags: ["Telegram", "Notifications"] },
		postProfileNotificationsByIdDeactivate: { invalidatesTags: ["Telegram", "Notifications"] },
	},
});
export const { useGetTelegramChatQuery, usePostProfileNotificationsByIdDeactivateMutation, usePostProfileNotificationsByIdActivateMutation } = telegramApi;
