import type { FC } from "react";

import { DashboardWidgetCard } from "@/shared/ui/dashboard-widget-card";

import { blackBoxTexts, InfoRuleList, ResponderList, type TBlackBoxResponder } from "@/entities/black-box";

import { useHowItWorksRules } from "../model/use-how-it-works-rules";

import { useBntTranslate } from "@/hooks/use-bnt-translate";

type TBlackBoxAsideProps = {
	responders: Array<TBlackBoxResponder>;
};

export const BlackBoxAside: FC<TBlackBoxAsideProps> = ({ responders }) => {
	const { t } = useBntTranslate();
	const rules = useHowItWorksRules();

	return (
		<>
			<DashboardWidgetCard title={t(blackBoxTexts.how_it_works)}>
				<InfoRuleList rules={rules} />
			</DashboardWidgetCard>
			{responders.length ? (
				<DashboardWidgetCard title={t(blackBoxTexts.responders)}>
					<ResponderList responders={responders} />
				</DashboardWidgetCard>
			) : null}
		</>
	);
};
