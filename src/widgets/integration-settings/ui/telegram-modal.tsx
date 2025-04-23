import { TBntModal } from "shared/ui/types/dialog-types";
import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntBox } from "shared/ui/box/bnt-box";
import { BntTypography } from "shared/ui/typography/typography";
import { texts_t } from "services/localization/texts";
import { BntStack } from "shared/ui/stack/stack";
import { useIcons } from "hooks/use-icons";

export const TelegramModal: FC<TBntModal<{ tg_code?: string }>> = ({ data }) => {
	const { t } = useBntTranslate();
	const { QrCode } = useIcons({ width: "300px" });

	return (
		<BntBox className="d-flex flex-column align-items-center">
			<BntTypography>
				<BntStack direction="row">
					{t(texts_t.telegram_code)}
					{data.tg_code}
				</BntStack>
			</BntTypography>
			<BntBox>
				<QrCode />
			</BntBox>
		</BntBox>
	);
};
