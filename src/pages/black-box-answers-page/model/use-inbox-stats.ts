import { blackBoxTexts, type TBlackBoxHeroStat, type TBlackBoxInboxCounts } from "@/entities/black-box";

import { useBntTranslate } from "@/hooks/use-bnt-translate";

export const useInboxStats = (counts: TBlackBoxInboxCounts): Array<TBlackBoxHeroStat> => {
	const { t } = useBntTranslate();

	return [
		{ key: "pending", value: counts.pending, label: t(blackBoxTexts.count_pending), isHighlighted: true },
		{ key: "published", value: counts.published, label: t(blackBoxTexts.count_published) },
	];
};
