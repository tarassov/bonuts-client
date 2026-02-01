import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useModal } from "entities/modal";
import { UiCheckbox } from "shared/ui/checkbox";
import { BntStack } from "shared/ui/stack";

import { ProfileNotification } from "services/api/bonuts-api";
import { texts_c, texts_n, texts_s } from "services/localization/texts";

import { BntTypography } from "@/shared/ui/typography";

interface IProps {
	notification: ProfileNotification;
}
export function NotificationItem({ notification }: IProps) {
	const { t } = useTranslation();
	const { ConnectTelegramModal } = useModal();

	const handleShowModal = (pluginName: string) => {
		switch (pluginName.toLowerCase()) {
			case "telegram":
				ConnectTelegramModal.show();
				break;
			// Add cases for other plugin types as needed
			default:
				// eslint-disable-next-line no-console
				console.log(`No modal configured for plugin: ${pluginName}`);
				break;
		}
	};
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
				<BntTypography variant="caption2">
					{notification.active ? t(texts_c.connected) : t(texts_n.not_connected)}
				</BntTypography>
				<Button
					sx={{ maxWidth: 200 }}
					disabled={notification.disabled}
					onClick={() => handleShowModal(notification.name)}
				>
					{notification.active ? t(texts_s.settings) : t(texts_c.connect)}{" "}
				</Button>
				<UiCheckbox value={notification.active} disabled />
			</BntStack>
		</BntStack>
	);
}
