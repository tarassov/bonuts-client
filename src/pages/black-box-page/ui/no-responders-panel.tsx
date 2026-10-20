import type { FC } from "react";

import { BntTypography } from "@/shared/ui/typography";

import { blackBoxTexts, HeroPanel } from "@/entities/black-box";

import { useBntTranslate } from "@/hooks/use-bnt-translate";

/** Takes the place of the question form on the hero while nobody answers the questions. */
export const NoRespondersPanel: FC = () => {
	const { t } = useBntTranslate();

	return (
		<HeroPanel>
			<BntTypography variant="body2">{t(blackBoxTexts.no_responders_yet)}</BntTypography>
		</HeroPanel>
	);
};
