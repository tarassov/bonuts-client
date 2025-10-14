import { BntBox } from "shared/ui/box/bnt-box";
import { BntStack } from "shared/ui/stack";
import { BntTypography } from "shared/ui/typography/typography";

import { texts_t } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { useIcons } from "hooks/use-icons";

import type { TBntModal } from "shared/ui/types";

export function TelegramModal({ data }: TBntModal<{ tg_code?: string }>) {
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
}
