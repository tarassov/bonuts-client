import { useFormattedDate } from "@/shared/lib/date";
import type { IDashboardWidgetSizingProps } from "@/shared/ui/dashboard-widget-card";
import { DashboardWidgetCard } from "@/shared/ui/dashboard-widget-card";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useProfile } from "@/entities/profile";

import { MetricGrid, MetricTile, WeekCaption } from "./current-week-statistics.styles";
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
	const { getFormattedDate } = useFormattedDate();
	const { authTenant } = useProfile();
	const { data, isLoading } = useGetParticipationWeeklyRecognitionCurrentQuery(
		{ tenant: authTenant || undefined },
		{
			skip: !authTenant,
			refetchOnMountOrArgChange: true,
		}
	);
	const title = t(texts_c.current_week_statistics, { capitalize: true });

	return (
		<DashboardWidgetCard
			columns={columns}
			title={title}
			headerAction={
				data && (
					<WeekCaption>
						{getFormattedDate(data?.week_start, { day: "numeric", month: "short" })} — {getFormattedDate(data?.week_end, { day: "numeric", month: "short" })}
					</WeekCaption>
				)
			}
		>
			<BntStack gap={1.5} data-testid="dashboard-widget-current-week-statistics">
				{isLoading ? (
					<BntTypography variant="caption" color="text.secondary">
						...
					</BntTypography>
				) : data ? (
					<MetricGrid>
						{WEEKLY_RECOGNITION_METRICS.map((metric) => (
							<MetricTile key={metric.key}>
								<BntTypography variant="caption" color="text.secondary">
									{t(metric.label, { capitalize: true })}
								</BntTypography>
								<BntTypography variant="h6" sx={{ fontSize: "1rem", lineHeight: 1.5 }} fontWeight={700} color={metric.key === "sent_donuts_count" ? "primary.main" : "text.primary"}>
									{data[metric.key]}
								</BntTypography>
							</MetricTile>
						))}
					</MetricGrid>
				) : (
					<BntTypography variant="caption" color="text.secondary">
						{t(texts_n.no_data_yet, { capitalize: true })}
					</BntTypography>
				)}
			</BntStack>
		</DashboardWidgetCard>
	);
}
