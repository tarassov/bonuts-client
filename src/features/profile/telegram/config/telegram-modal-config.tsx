import { defineModal } from "@/shared/ui/dialog";

import { TTelegramModalResponse } from "@/entities/telegram";

import { TelegramModal } from "../ui/telegram-modal";

export const telegramModalConfig = {
	items: {
		ConnectTelegramModal: defineModal<void, TTelegramModalResponse["ConnectTelegramModal"]>({
			renderItem: (_, props) => <TelegramModal {...props} />,
		}),
	},
};
