import { TBntModalConfig } from "shared/ui/types/dialog-types";

import { TelegramModal } from "@/entities/telegram/ui/telegram-modal";

export type TTelegramModalConfig = {
	ConnectTelegramModal: { tg_code?: string };
};

export const telegramModalConfig: TBntModalConfig<TTelegramModalConfig> = {
	items: {
		ConnectTelegramModal: {
			renderItem: (modal) => <TelegramModal {...modal} />,
		},
	},
};
