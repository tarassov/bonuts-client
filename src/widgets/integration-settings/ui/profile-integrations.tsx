import { useTranslation } from "react-i18next";
import { present } from "shared/lib/type-guards";
import { useCurrentProfile } from "shared/model/auth";
import { BntBox } from "shared/ui/box/bnt-box";
import { useLoader } from "shared/ui/loader/hooks/use-loader";
import { BntTypography } from "shared/ui/typography/typography";

import { Modules } from "constants/modules";

import { useGetProfileNotificationsQuery } from "services/api/bonuts-api";
import { texts_l, texts_n } from "services/localization/texts";

import { TelegramPlugin } from "@/features/profile/telegram/ui/TelegramPlugin";

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
			<BntBox className="d-flex flex-column pl-4 pt-4 pr-4">
				{isLoadingNotifications ? <BntTypography variant="caption2">{t(texts_l.loading)}</BntTypography> : null}
				{!isLoadingNotifications && present(profileNotifications?.data) ? (
					profileNotifications.data.map((notification) => (
						<NotificationItem key={notification.tenant_plugin_id} notification={notification} />
					))
				) : (
					<BntTypography variant="caption2">{t(texts_n.no_integrations_available)}</BntTypography>
				)}
			</BntBox>
			<TelegramPlugin />
		</>
	);
}
