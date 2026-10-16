import { BntTypography } from "@/shared/ui/typography";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_n } from "@/services/localization/texts";

export function YourStatusEmptyPlaceholder() {
	const { t } = useBntTranslate();

	return (
		<BntTypography variant="body2" color="text.secondary">
			{t(texts_n.no_data_yet, { capitalize: true })}
		</BntTypography>
	);
}
