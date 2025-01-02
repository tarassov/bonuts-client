import { TBntModalConfig } from "shared/ui/types/dialog-types";
import { TelegramModal } from "@/features/integration-settings/modal/telegram-modal";

export type IntegrationModalType = {
	ConnectTelegramModal: { tg_code?: string };
};

export const integrationsModalConfig: TBntModalConfig<IntegrationModalType> = {
	items: {
		ConnectTelegramModal: {
			renderItem: (modal) => <TelegramModal {...modal} />,
		},
	},
};
