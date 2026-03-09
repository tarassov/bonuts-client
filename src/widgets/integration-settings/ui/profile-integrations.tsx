import { useTranslation } from "react-i18next";

import { Modules } from "constants/modules";
import { useGetProfileNotificationsQuery } from "services/api/bonuts-api";
import { texts_l, texts_n } from "services/localization/texts";
import { present } from "shared/lib/type-guards";
import { useCurrentProfile } from "shared/model/auth";
import { useLoader } from "shared/ui/loader/hooks/use-loader";
import { BntTypography } from "shared/ui/typography/typography";

import { TelegramPlugin } from "@/features/profile/telegram/";
import { VkPlugin } from "@/features/profile/vk";

import { NotificationItem } from "./notification-item";

export function ProfileIntegrations() {
	const { t } = useTranslation();
	const { authTenant } = useCurrentProfile();
	const {
		data: profileNotifications,
		isLoading: isLoadingNotifications,
		isFetching,
	} = useGetProfileNotificationsQuery({
		tenant: authTenant,
	});

	useLoader(Modules.Integrations, isLoadingNotifications || isFetching);

	return (
		<>
			{isLoadingNotifications ? <BntTypography variant="caption2">{t(texts_l.loading)}</BntTypography> : null}
			{!isLoadingNotifications && present(profileNotifications?.data) ? (
				profileNotifications.data.map((notification) => (
					<NotificationItem key={notification.tenant_plugin_id} notification={notification} />
				))
			) : (
				<BntTypography variant="caption2">{t(texts_n.no_integrations_available)}</BntTypography>
			)}
			<TelegramPlugin />
			<VkPlugin />
		</>
	);
}
