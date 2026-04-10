import type { IDashboardWidgetSizingProps } from "@/shared/ui/dashboard-widget-card";
import { DashboardWidgetCard } from "@/shared/ui/dashboard-widget-card";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useProfile } from "@/entities/profile";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import type { GetParticipationWeeklyRecognitionCurrentApiResponse } from "@/services/api/bonuts-api";
import { useGetParticipationWeeklyRecognitionCurrentQuery } from "@/services/api/bonuts-api";
import { texts_c, texts_d, texts_l, texts_n } from "@/services/localization/texts";

type TWeeklyRecognitionCounterKey = keyof Pick<GetParticipationWeeklyRecognitionCurrentApiResponse, "likes_given_count" | "comments_given_count" | "sent_donuts_count" | "received_donuts_count">;

interface IWeeklyRecognitionMetric {
	key: TWeeklyRecognitionCounterKey;
	label: texts_l | texts_c | texts_d;
}

const WEEKLY_RECOGNITION_METRICS: IWeeklyRecognitionMetric[] = [
	{ key: "likes_given_count", label: texts_l.likes_given },
	{ key: "comments_given_count", label: texts_c.comments_written },
	{ key: "sent_donuts_count", label: texts_d.donuts_sent },
	{ key: "received_donuts_count", label: texts_d.donuts_received },
];

export function CurrentWeekStatisticsWidget({ columns = 1 }: IDashboardWidgetSizingProps) {
	const { t } = useBntTranslate();
	const { authTenant } = useProfile();
	const { data, isLoading } = useGetParticipationWeeklyRecognitionCurrentQuery(
		{ tenant: authTenant || undefined },
		{
			skip: !authTenant,
			refetchOnMountOrArgChange: true,
		}
	);

	return (
		<DashboardWidgetCard columns={columns}>
			<BntStack gap={1.5}>
				<BntTypography variant="subtitle1" fontWeight={700}>
					{t(texts_c.current_week_statistics, { capitalize: true })}
				</BntTypography>
				{isLoading ? (
					<BntTypography variant="body2" color="text.secondary">
						...
					</BntTypography>
				) : data ? (
					<BntStack gap={1}>
						{WEEKLY_RECOGNITION_METRICS.map((metric) => (
							<BntStack key={metric.key} direction="row" justifyContent="space-between" gap={1}>
								<BntTypography variant="body2" color="text.secondary">
									{t(metric.label, { capitalize: true })}
								</BntTypography>
								<BntTypography variant="body2" fontWeight={700}>
									{data[metric.key]}
								</BntTypography>
							</BntStack>
						))}
					</BntStack>
				) : (
					<BntTypography variant="body2" color="text.secondary">
						{t(texts_n.no_data_yet, { capitalize: true })}
					</BntTypography>
				)}
			</BntStack>
		</DashboardWidgetCard>
	);
}
