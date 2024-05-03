import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";
import { BntBox } from "shared/box/bnt-box";
import { texts_c, texts_n } from "services/localization/texts";
import { useModal } from "hooks/use-modal";
import { BntStack } from "shared/stack/stack";
import { BntTypography } from "shared/typography/typography";
import { Button } from "@mui/material";
import { useIcons } from "hooks/use-icons";
import { useBntTranslate } from "hooks/use-bnt-translate";

export const ProfileNotifications = () => {
	const { profile, isLoading } = useProfileLogic();
	const icons = useIcons({ width: "48px", height: "48px" });
	const Icon = icons.TelegramIcon;
	const { t } = useBntTranslate();
	const { ConnectTelegramModal } = useModal();
	return (
		<BntBox className="d-flex flex-column pl-4 pt-8 pr-4" sx={{ maxWidth: 450, margin: "0 auto" }}>
			<BntTypography variant="h5">{t(texts_n.notifications, { capitalize: true })}</BntTypography>
			<BntStack direction="column" gap={2} className="w-100 mt-8">
				<BntStack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					sx={{ maxWidth: 350, borderBottom: "1px dotted", paddingBottom: "4px" }}
				>
					<BntStack direction="row" gap={2}>
						<Icon />
						<BntStack direction="column" alignItems="start">
							<BntTypography variant="subtitle1">Telegram</BntTypography>
							<BntTypography variant="caption" color="grey.700">
								{t(texts_n.not_connected)}
							</BntTypography>
						</BntStack>
					</BntStack>
					<BntStack direction="row" alignItems="center">
						<Button
							sx={{ maxWidth: 200 }}
							disabled={isLoading}
							onClick={() => {
								if (!isLoading) ConnectTelegramModal.show({ tg_code: profile?.tg_code });
							}}
						>
							{t(texts_c.connect)}
						</Button>
					</BntStack>
				</BntStack>
				<BntStack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					sx={{ maxWidth: 350, borderBottom: "1px dotted", paddingBottom: "4px" }}
				>
					<BntStack direction="row" gap={2}>
						<Icon />
						<BntStack direction="column" alignItems="start">
							<BntTypography variant="subtitle1">Mattermost</BntTypography>
							<BntTypography variant="caption" color="grey.700">
								{t(texts_n.not_connected)}
							</BntTypography>
						</BntStack>
					</BntStack>
					<BntStack direction="row" alignItems="center">
						<Button
							sx={{ maxWidth: 200 }}
							disabled={isLoading}
							onClick={() => {
								if (!isLoading) ConnectTelegramModal.show({ tg_code: profile?.tg_code });
							}}
						>
							{t(texts_c.connect)}
						</Button>
					</BntStack>
				</BntStack>
			</BntStack>
		</BntBox>
	);
};
