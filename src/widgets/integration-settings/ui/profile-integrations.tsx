import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useModal } from "entities/modal";
import { present } from "shared/lib/type-guards";
import { useCurrentProfile } from "shared/model/auth";
import { BntBox } from "shared/ui/box/bnt-box";
import { UiCheckbox } from "shared/ui/checkbox";
import { BntStack } from "shared/ui/stack";
import { BntTypography } from "shared/ui/typography/typography";

import { useGetProfileNotificationsQuery } from "services/api/bonuts-api";
import { texts_c, texts_l, texts_n, texts_s } from "services/localization/texts";

import { useProfile } from "@/entities/profile";

import { useTelegramChat } from "@/features/profile/telegram/model/use-telegram-chat";

export function ProfileIntegrations() {
	const { profile, isLoading } = useProfile();
	const { t } = useTranslation();
	const { ConnectTelegramModal } = useModal();
	const { authTenant } = useCurrentProfile();
	const { data: chatData } = useTelegramChat();
	const { data: profileNotifications, isLoading: isLoadingNotifications } = useGetProfileNotificationsQuery({
		tenant: authTenant,
	});

	// Function to handle showing the appropriate dialog based on plugin name
	const handleShowModal = async (pluginName: string, tenantPluginId: number) => {
		if (isLoading) return;
		const showTg = ConnectTelegramModal.show;
		let r: Awaited<ReturnType<typeof showTg>>;

		switch (pluginName.toLowerCase()) {
			case "telegram":
				r = await ConnectTelegramModal.show();
				console.log(r);
				break;
			// Add cases for other plugin types as needed
			default:
				// eslint-disable-next-line no-console
				console.log(`No modal configured for plugin: ${pluginName}`);
				break;
		}
	};

	const isConnected = (pluginName: string) => {
		if (isLoading) return;

		switch (pluginName.toLowerCase()) {
			case "telegram":
				return { needConnection: true, connected: present(chatData) };
			default:
				return { needConnection: false, connected: false };
		}
	};

	return (
		<BntBox className="d-flex flex-column pl-4 pt-4 pr-4">
			{isLoadingNotifications ? <BntTypography variant="caption2">{t(texts_l.loading)}</BntTypography> : null}
			{!isLoadingNotifications && present(profileNotifications?.data) ? (
				profileNotifications.data.map((notification) => (
					<BntStack
						key={notification.tenant_plugin_id}
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						sx={{
							maxWidth: 350,
							borderBottom: "1px dotted",
							paddingBottom: "4px",
							marginBottom: "8px",
						}}
					>
						<BntTypography variant="caption2">{notification.name}</BntTypography>
						<BntStack direction="row" alignItems="center">
							<BntTypography variant="caption2">
								{notification.active ? t(texts_c.connected) : t(texts_n.not_connected)}
							</BntTypography>
							<Button
								sx={{ maxWidth: 200 }}
								disabled={isLoading || notification.disabled}
								onClick={() => handleShowModal(notification.name, notification.tenant_plugin_id)}
							>
								{notification.active ? t(texts_s.settings) : t(texts_c.connect)}{" "}
							</Button>
							<UiCheckbox value={notification.active} disabled />
						</BntStack>
					</BntStack>
				))
			) : (
				<BntTypography variant="caption2">{t(texts_n.no_integrations_available)}</BntTypography>
			)}
		</BntBox>
	);
}
