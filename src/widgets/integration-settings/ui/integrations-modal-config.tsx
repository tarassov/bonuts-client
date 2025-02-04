import { TBntModalConfig } from "shared/ui/types/dialog-types";
import { TelegramModal } from "@/widgets/integration-settings/ui/telegram-modal";

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
