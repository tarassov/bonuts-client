import { useCallback, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { BntBox } from "shared/ui/box/bnt-box";
import { BntButton } from "shared/ui/buttons/bnt-button";
import { BntStack } from "shared/ui/stack";
import { BntTypography } from "shared/ui/typography/typography";

import { texts_g } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { useIcons } from "hooks/use-icons";

import { useCurrentProfile } from "@/entities/profile";

import { useTelegramCode } from "../model/use-telegram-code";

export function TelegramModal() {
	const { t } = useBntTranslate();
	const { generateTgCode, isLoading: isGeneratingCode } = useTelegramCode();
	const { profile } = useCurrentProfile();
	const { QrCode } = useIcons({ width: "300px", height: "300px" });

	const handleGenerateCode = useCallback(() => {
		generateTgCode();
	}, [generateTgCode]);

	useEffect(() => {
		if (!profile?.tg_code) generateTgCode();
	}, [generateTgCode, profile?.tg_code]);

	return (
		<BntBox className="d-flex flex-column align-items-center">
			<BntStack direction="column">
				<BntButton onClick={handleGenerateCode}>{t(texts_g.generate_code)}</BntButton>
				{isGeneratingCode ? <CircularProgress /> : <BntTypography variant="h3"> {profile?.tg_code} </BntTypography>}
			</BntStack>
			<BntBox>
				<QrCode />
			</BntBox>
		</BntBox>
	);
}
