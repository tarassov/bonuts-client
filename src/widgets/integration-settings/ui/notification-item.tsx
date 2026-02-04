import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { present } from "shared/lib/type-guards";

import { ProfileNotification } from "services/api/bonuts-api";
import { texts_c, texts_s } from "services/localization/texts";

import { UiCheckbox } from "@/shared/ui/checkbox";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { usePlugin } from "@/entities/plugin";

interface IProps {
	notification: ProfileNotification;
}
export function NotificationItem({ notification }: IProps) {
	const { t } = useTranslation();
	const api = usePlugin(notification.name);
	const [connected, setConnected] = useState(present(api) ? api.isConnected() : false);

	useEffect(() => {
		const isConnected = present(api) ? api.isConnected() : false;
		if (isConnected) setConnected(isConnected);

		api?.onConnectChange(setConnected);
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
					<Button
						sx={{ maxWidth: 200 }}
						disabled={notification.disabled}
						onClick={present(api) ? api.connect : undefined}
					>
						{notification.active ? t(texts_s.settings) : t(texts_c.connect)}{" "}
					</Button>
				)}
				{connected ? <UiCheckbox value={notification.active} disabled /> : null}
			</BntStack>
		</BntStack>
	);
}
