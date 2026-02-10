import { TDialogConfig } from "shared/ui/dialog/dialog-types";

import { TelegramModal } from "@/features/profile/telegram/ui/telegram-modal";

import { TTelegramModalConfig, TTelegramModalResponse } from "entities/telegram";

export const telegramModalConfig: TDialogConfig<TTelegramModalConfig, TTelegramModalResponse> = {
	items: {
		ConnectTelegramModal: {
			renderItem: (_, props) => <TelegramModal {...props} />,
		},
	},
};
