import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

import { BntBox } from "shared/ui/box/bnt-box";
import { BntStack } from "shared/ui/stack/stack";
import { BntTypography } from "shared/ui/typography/typography";

import { texts_c, texts_n } from "services/localization/texts";

import { useModal } from "hooks/use-modal";

import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";

export const ProfileIntegrations = () => {
	const { profile, isLoading } = useProfileLogic();
	const { t } = useTranslation();
	const { ConnectTelegramModal } = useModal();
	return (
		<BntBox className="d-flex flex-column pl-4 pt-4 pr-4">
			<BntStack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				sx={{ maxWidth: 350, borderBottom: "1px dotted", paddingBottom: "4px" }}
			>
				<BntTypography variant="caption2">Telegram</BntTypography>
				<BntStack direction="row" alignItems="center">
					<BntTypography variant="caption2">{t(texts_n.not_connected)}</BntTypography>
					<Button
						sx={{ maxWidth: 200 }}
						disabled={isLoading}
						onClick={() => {
							if (!isLoading) ConnectTelegramModal.show({ tg_code: profile?.tg_code });
						}}
					>
						{t(texts_c.connect)}{" "}
					</Button>
				</BntStack>
			</BntStack>
		</BntBox>
	);
};
