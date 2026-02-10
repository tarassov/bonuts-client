import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

import { Modules } from "constants/modules";
import { ProfileNotification } from "services/api/bonuts-api";
import { texts_c, texts_s } from "services/localization/texts";
import { present } from "shared/lib/type-guards";
import { useLoader } from "shared/ui/loader/hooks/use-loader";

import { UiCheckbox } from "@/shared/ui/checkbox";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { IPluginApi, usePlugin } from "@/entities/plugin";
import { useProfileNotification } from "@/entities/profile";

interface IProps {
	notification: ProfileNotification;
}

const getIsConnected = (api?: IPluginApi) => (present(api) ? api.isConnected() : true);

export function NotificationItem({ notification }: IProps) {
	const { t } = useTranslation();
	const api = usePlugin(notification.name);
	const [connected, setConnected] = useState<boolean>(getIsConnected(api));
	const { activatePlugin, deactivatePlugin, isLoading } = useProfileNotification(notification.tenant_plugin_id);

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
		if (isConnected) setConnected(isConnected);

		if (present(api)) {
			api.onConnectChange(setConnected);
		}
	}, [api]);

	return (
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
				{connected ? null : (
					<Button sx={{ maxWidth: 200 }} disabled={notification.disabled} onClick={present(api) ? api.connect : undefined}>
						{notification.active ? t(texts_s.settings) : t(texts_c.connect)}{" "}
					</Button>
				)}
				{connected ? <UiCheckbox checked={notification.active} onChange={handleActiveChange} /> : null}
			</BntStack>
		</BntStack>
	);
}
