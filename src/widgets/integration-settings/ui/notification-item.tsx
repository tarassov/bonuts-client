import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button } from "@mui/material";

import _ from "lodash";

import { Modules } from "constants/modules";
import { ProfileNotification } from "services/api/bonuts-api";
import { texts_c, texts_d, texts_n } from "services/localization/texts";
import { present } from "shared/lib/type-guards";
import { useLoader } from "shared/ui/loader/hooks/use-loader";

import { UiCheckbox } from "@/shared/ui/checkbox";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { type IPluginApi, usePlugin } from "@/entities/plugin";
import { useProfileNotification } from "@/entities/profile";

import classes from "./notification-item.module.scss";

interface IProps {
	notification: ProfileNotification;
}

const getIsConnected = (api?: IPluginApi) => (present(api) ? api.isConnected() : true);

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
	const handleDisconnect = useCallback(() => {
		if (present(api) && present(api.disconnect)) {
			api.disconnect();
		}
	}, [api]);

	useEffect(() => {
		const isConnected = getIsConnected(api);
		setConnected(isConnected);

		if (present(api)) {
			api.onConnectChange(setConnected);
		}
	}, [api]);

	return (
		<BntStack key={notification.tenant_plugin_id} direction="column" justifyContent="space-between" className={classes.root}>
			<BntStack direction="row" justifyContent="space-between" alignItems="flex-start" className={classes.header}>
				<BntStack direction="row" spacing={1.5} alignItems="center">
					{api?.icon ? api.icon : null}
					{api?.hideName ? null : (
						<BntTypography variant="subtitle2" color="secondary">
							{_.capitalize(notification.name)}
						</BntTypography>
					)}
				</BntStack>
				<BntStack direction="row" alignItems="center" spacing={0.5} className={classes.pluginMeta}>
					<Box className={classes.statusDot} sx={{ bgcolor: connected ? "success.main" : "error.main" }} />
					<BntTypography variant="caption2">{connected ? t(texts_c.connected) : t(texts_n.not_connected)}</BntTypography>
					{connected && present(api?.disconnect) ? (
						<>
							<BntTypography variant="caption2">(</BntTypography>
							<Button variant="text" disabled={notification.disabled} onClick={handleDisconnect} className={classes.actionLink}>
								{t(texts_d.disconnect)}
							</Button>
							<BntTypography variant="caption2">)</BntTypography>
						</>
					) : null}
					{!connected ? (
						<Button variant="text" disabled={notification.disabled} onClick={present(api) ? api.connect : undefined} className={classes.actionLink}>
							{t(texts_c.connect)}
						</Button>
					) : null}
				</BntStack>
			</BntStack>
			<BntStack direction="row" justifyContent="space-between" alignItems="center" sx={{ pl: api?.icon ? 0.5 : 0 }} className={classes.notificationRow}>
				<BntTypography variant="caption2">{t(texts_n.notifications)}</BntTypography>
				<BntStack direction="row" spacing={1} alignItems="center">
					{disableReason ? (
						<BntTypography variant="caption2" className={classes.disableReason}>
							{disableReason}
						</BntTypography>
					) : null}
					<UiCheckbox checked={notification.active} disabled={isNotificationsDisabled} onChange={handleActiveChange} />
				</BntStack>
			</BntStack>
		</BntStack>
	);
}
