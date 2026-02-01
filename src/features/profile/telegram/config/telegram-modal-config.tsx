import { TTelegramModalConfig, TTelegramModalResponse } from "entities/telegram";
import { TDialogConfig } from "shared/ui/dialog/dialog-types";

import { TelegramModal } from "@/features/profile/telegram/ui/telegram-modal";

export const telegramModalConfig: TDialogConfig<TTelegramModalConfig, TTelegramModalResponse> = {
	items: {
		ConnectTelegramModal: {
			renderItem: (_, props) => <TelegramModal {...props} />,
		},
	},
};
