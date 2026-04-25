import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

import _ from "lodash";

import { Modules } from "constants/modules";
import { ProfileNotification } from "services/api/bonuts-api";
import { texts_c, texts_d, texts_i, texts_n } from "services/localization/texts";

import { present } from "@/shared/lib/type-guards";
import { BntCard } from "@/shared/ui/card/card";
import { useLoader } from "@/shared/ui/loader";
import { BntStack } from "@/shared/ui/stack";
import { UiSwitch } from "@/shared/ui/switch";
import { BntTypography } from "@/shared/ui/typography";

import { type IPluginApi, usePlugin } from "@/entities/plugin";
import { useProfileNotification } from "@/entities/profile";

import classes from "./notification-item.module.scss";

interface IProps {
	notification: ProfileNotification;
}

const getIsConnected = (api?: IPluginApi) => (present(api) ? api.isConnected() : true);

const INTEGRATION_DESCRIPTIONS: Record<string, texts_i> = {
	email: texts_i.integration_email_description,
	mattermost: texts_i.integration_mattermost_description,
	telegram: texts_i.integration_telegram_description,
	vk: texts_i.integration_vk_description,
};

function getIntegrationDescription(name: string) {
	return INTEGRATION_DESCRIPTIONS[name.toLowerCase()] ?? texts_i.integration_channels;
}

export function NotificationItem({ notification }: IProps) {
	const { t } = useTranslation();
	const api = usePlugin(notification.name);
	const [connected, setConnected] = useState<boolean>(getIsConnected(api));
	const { activatePlugin, deactivatePlugin, isLoading } = useProfileNotification(notification.tenant_plugin_id);
	const pluginDisabledState = api?.getDisabledState?.();
	const disableReason = pluginDisabledState?.reason;
	const isNotificationsDisabled = !connected || notification.disabled || pluginDisabledState?.disabled;

	useLoader(Modules.Integrations, isLoading);

	const handleActiveChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
			if (checked) return activatePlugin();

			deactivatePlugin();
		},
		[activatePlugin, deactivatePlugin]
	);

	useEffect(() => {
		const isConnected = getIsConnected(api);
		setConnected(isConnected);

		if (present(api)) {
			api.onConnectChange(setConnected);
		}
	}, [api]);

	return (
		<BntCard className={classes.card}>
			<BntStack direction="column" className={classes.body}>
				<BntStack direction="row" className={classes.header}>
					<BntStack direction="row" className={classes.identity}>
						{api?.icon ? <div className={classes.iconWrap}>{api.icon}</div> : null}
						<BntStack direction="column" spacing={0.5}>
							{api?.hideName ? null : <BntTypography variant="subtitle1">{_.capitalize(notification.name)}</BntTypography>}
							<BntStack direction="row" className={classes.status}>
								<div className={classes.statusDot} style={{ backgroundColor: connected ? "var(--mui-palette-success-main)" : "var(--mui-palette-grey-500)" }} />
								<BntTypography variant="caption2">{connected ? t(texts_c.connected) : t(texts_n.not_connected)}</BntTypography>
							</BntStack>
						</BntStack>
					</BntStack>
				</BntStack>

				<BntTypography variant="body2" color="text.secondary" className={classes.description}>
					{t(getIntegrationDescription(notification.name))}
				</BntTypography>

				<BntStack direction="row" className={classes.footer}>
					<BntStack direction="column" className={classes.notifications}>
						<BntStack direction="row" className={classes.notificationsRow}>
							<BntTypography variant="caption2">{t(texts_n.notifications)}</BntTypography>
							<UiSwitch checked={notification.active && !isNotificationsDisabled} disabled={isNotificationsDisabled} onChange={handleActiveChange} />
						</BntStack>
						{disableReason ? (
							<BntTypography variant="caption2" color="text.secondary" className={classes.disableReason}>
								{disableReason}
							</BntTypography>
						) : null}
					</BntStack>
					{!connected && present(api?.connect) ? (
						<Button variant="text" disabled={notification.disabled} onClick={() => api.connect()} className={classes.actionButton}>
							{t(texts_c.connect)}
						</Button>
					) : null}
					{connected && present(api?.disconnect) ? (
						<Button variant="text" disabled={notification.disabled} onClick={() => api.disconnect?.()} className={classes.actionButton}>
							{t(texts_d.disconnect)}
						</Button>
					) : null}
				</BntStack>
			</BntStack>
		</BntCard>
	);
}
