import { TBntModalConfig } from "shared/types/dialog-types";
import { TelegramModal } from "@/features/integration-settings/modal/telegram-modal";

export type IntegrationModalType = {
	ConnectTelegramModal: { tg_code };
};

export const integrationsModalConfig: TBntModalConfig<IntegrationModalType> = {
	items: {
		ConnectTelegramModal: {
			renderItem: (modal) => <TelegramModal {...modal} />,
		},
	},
};
