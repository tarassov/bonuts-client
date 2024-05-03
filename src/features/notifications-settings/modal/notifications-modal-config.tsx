import { TBntModalConfig } from "shared/types/dialog-types";
import { TelegramModal } from "@/features/notifications-settings/modal/telegram-modal";

export type IntegrationModalType = {
	ConnectTelegramModal: { tg_code };
};

export const notificationsModalConfig: TBntModalConfig<IntegrationModalType> = {
	items: {
		ConnectTelegramModal: {
			renderItem: (modal) => <TelegramModal {...modal} />,
		},
	},
};
