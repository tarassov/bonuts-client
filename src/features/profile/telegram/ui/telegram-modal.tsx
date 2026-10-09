import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { useIcons } from "hooks/use-icons";
import { texts_g } from "services/localization/texts";

import { useCurrentProfile } from "@/shared/model/auth";
import { BntBox } from "@/shared/ui/box";
import { BntButton } from "@/shared/ui/buttons";
import type { TDialogProps } from "@/shared/ui/dialog";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import type { TTelegramModalResponse } from "@/entities/telegram";

import { useTelegramCode } from "../model/use-telegram-code";

export function TelegramModal({ close }: TDialogProps<TTelegramModalResponse["ConnectTelegramModal"]>) {
	const { t } = useBntTranslate();
	const { generateTgCode, isLoading: isGeneratingCode } = useTelegramCode();
	const { profile } = useCurrentProfile();
	const { QrCode } = useIcons({ width: "300px", height: "300px" });

	useDispatch();

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
