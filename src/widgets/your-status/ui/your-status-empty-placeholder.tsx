import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_n, texts_y } from "@/services/localization/texts";

export function YourStatusEmptyPlaceholder() {
	const { t } = useBntTranslate();

	return (
		<BntStack gap={1.5}>
			<BntTypography variant="subtitle1" fontWeight={700}>
				{t(texts_y.your_status, { capitalize: true })}
			</BntTypography>
			<BntTypography variant="body2" color="text.secondary">
				{t(texts_n.no_data_yet, { capitalize: true })}
			</BntTypography>
		</BntStack>
	);
}
