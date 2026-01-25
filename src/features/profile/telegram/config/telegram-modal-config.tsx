import { TTelegramModalConfig } from "entities/telegram";
import { TDialogConfig } from "shared/ui/dialog/dialog-types";

import { TelegramModal } from "@/features/profile/telegram/ui/telegram-modal";

export const telegramModalConfig: TDialogConfig<TTelegramModalConfig> = {
	items: {
		ConnectTelegramModal: {
			renderItem: (modal) => <TelegramModal {...modal} />,
		},
	},
};
