import { useCallback, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { BntBox } from "shared/ui/box/bnt-box";
import { BntButton } from "shared/ui/buttons/bnt-button";
import { BntStack } from "shared/ui/stack";

import { texts_g } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { useIcons } from "hooks/use-icons";

import { useCurrentProfile } from "@/shared/model/auth";
import { BntTypography } from "@/shared/ui/typography";

import { useTelegramCode } from "../model/use-telegram-code";

import type { TModalResponse } from "@/entities/modal";
import type { TDialogProps } from "@/shared/ui/dialog";

export function TelegramModal({ close }: TDialogProps<TModalResponse["ConnectTelegramModal"]>) {
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
				{/* <BntButton onClick={() => close({ value: "hey" })}>Close</BntButton> */}
				{isGeneratingCode ? <CircularProgress /> : <BntTypography variant="h3"> {profile?.tg_code} </BntTypography>}
			</BntStack>
			<BntBox>
				<QrCode />
			</BntBox>
		</BntBox>
	);
}
