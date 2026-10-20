import type { FC } from "react";

import { DashboardWidgetCard } from "@/shared/ui/dashboard-widget-card";

import { blackBoxTexts, InfoRuleList, ResponderList, useBlackBoxTenant, useGetBlackBoxRespondersQuery } from "@/entities/black-box";

import { useAnsweringRules } from "../model/use-answering-rules";

import { useBntTranslate } from "@/hooks/use-bnt-translate";

export const AnswersAside: FC = () => {
	const { t } = useBntTranslate();
	const tenant = useBlackBoxTenant();
	const rules = useAnsweringRules();
	const { data } = useGetBlackBoxRespondersQuery({ tenant }, { skip: !tenant });

	return (
		<>
			<DashboardWidgetCard title={t(blackBoxTexts.answering_rules)}>
				<InfoRuleList rules={rules} />
			</DashboardWidgetCard>
			<DashboardWidgetCard title={t(blackBoxTexts.responders)}>
				<ResponderList responders={data?.data ?? []} hasAnswerCounts />
			</DashboardWidgetCard>
		</>
	);
};
