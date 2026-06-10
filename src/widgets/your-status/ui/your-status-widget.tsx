import type { ReactNode } from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { EmojiEventsOutlined, LocalFireDepartmentOutlined, WorkspacePremiumOutlined } from "@mui/icons-material";
import { Box, Divider, LinearProgress } from "@mui/material";

import { present } from "@/shared/lib/type-guards";
import type { IDashboardWidgetSizingProps } from "@/shared/ui/dashboard-widget-card";
import { DashboardWidgetCard } from "@/shared/ui/dashboard-widget-card";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useProfile } from "@/entities/profile";

import type { TStatusTone } from "../model/your-status-helper";
import {
	formatStatusBucketLabel,
	getNextBucketTargetPercent,
	getStatusBucketPercent,
	getStatusProgressPercent,
	getStatusTone,
	getTopMostActivePercentFromPositionPercentile,
	getTopStatusSuggestions,
} from "../model/your-status-helper";

import { YourStatusEmptyPlaceholder } from "./your-status-empty-placeholder";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useGetParticipationCurrentWeekQuery } from "@/services/api/bonuts-api";
import { texts_i, texts_n, texts_p, texts_r, texts_s, texts_t, texts_y } from "@/services/localization/texts";

const STATUS_LABEL_BY_TONE: Record<TStatusTone, texts_s | texts_r | texts_t> = {
	primary: texts_s.social_newcomer,
	secondary: texts_s.steady_contributor,
	warning: texts_r.recognized_voice,
	success: texts_t.team_star,
};

const STATUS_ICON_BY_TONE: Record<TStatusTone, ReactNode> = {
	primary: <WorkspacePremiumOutlined />,
	secondary: <LocalFireDepartmentOutlined />,
	warning: <EmojiEventsOutlined />,
	success: <WorkspacePremiumOutlined />,
};

export function YourStatusWidget({ columns = 1 }: IDashboardWidgetSizingProps) {
	const { t } = useBntTranslate();
	const { t: i18nT } = useTranslation();
	const { authTenant } = useProfile();
	const { data } = useGetParticipationCurrentWeekQuery(
		{ tenant: authTenant || undefined },
		{
			skip: !authTenant,
			refetchOnMountOrArgChange: true,
		}
	);

	const weeklyScore = data?.weekly_score_scaled || 0;
	const isHighestBucketReached = Boolean(data?.highest_bucket_reached);
	const statusTone = getStatusTone(weeklyScore, isHighestBucketReached);
	const progressPercent = getStatusProgressPercent({
		weeklyScoreScaled: weeklyScore,
		deltaScoreToNextBucketScaled: data?.delta_score_to_next_bucket_scaled || 0,
		nextBucketThresholdScoreScaled: data?.next_bucket_threshold_score_scaled,
		isHighestBucketReached,
	});
	const topSuggestions = useMemo(() => getTopStatusSuggestions(data?.suggestions || []), [data?.suggestions]);
	const currentStatusPercent = getStatusBucketPercent(data?.current_bucket) ?? getTopMostActivePercentFromPositionPercentile(data?.position_percentile);
	const nextStatusPercent = getNextBucketTargetPercent(data?.next_bucket);
	const isLowCurrentStatus = currentStatusPercent !== null && currentStatusPercent < 25;
	const currentStatusLabel = formatStatusBucketLabel(data?.current_bucket);

	if (!data) {
		return (
			<DashboardWidgetCard columns={columns}>
				<div data-testid="dashboard-widget-your-status">
					<YourStatusEmptyPlaceholder />
				</div>
			</DashboardWidgetCard>
		);
	}

	return (
		<DashboardWidgetCard columns={columns}>
			<BntStack gap={1.5} data-testid="dashboard-widget-your-status">
				<BntTypography variant="subtitle1" fontWeight={700}>
					{t(texts_y.your_status, { capitalize: true })}
				</BntTypography>
				<BntStack direction="row" alignItems="center" gap={1.5}>
					<Box
						sx={(theme) => ({
							width: 44,
							height: 44,
							minWidth: 44,
							borderRadius: "50%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: theme.palette[statusTone].light,
							color: theme.palette[statusTone].main,
						})}
					>
						{STATUS_ICON_BY_TONE[statusTone]}
					</Box>
					<Box>
						<BntTypography variant="body1" fontWeight={700}>
							{isLowCurrentStatus
								? t(texts_p.poka_you_were_not_very_active, { capitalize: true })
								: currentStatusPercent
									? i18nT(texts_i.in_top_most_active_percent, { percent: currentStatusPercent })
									: currentStatusLabel || t(STATUS_LABEL_BY_TONE[statusTone], { capitalize: true })}
						</BntTypography>
					</Box>
				</BntStack>
				{!isHighestBucketReached ? (
					<>
						<LinearProgress variant="determinate" value={progressPercent} color={statusTone} sx={{ height: 8, borderRadius: 99 }} />
						<BntStack direction="row" justifyContent="space-between" gap={1}>
							<BntTypography variant="caption" color="text.secondary">
								{t(texts_s.status, { capitalize: true })}
							</BntTypography>
							<BntTypography variant="caption" color="text.secondary" textAlign="right">
								{nextStatusPercent ? i18nT(texts_i.into_top_most_active_percent, { percent: nextStatusPercent }) : t(texts_n.next_status, { capitalize: true })}
							</BntTypography>
						</BntStack>
					</>
				) : null}
				{present(topSuggestions) ? (
					<BntStack gap={0.5}>
						<Divider sx={{ my: 0.5 }} />
						{topSuggestions.map((suggestion) => (
							<BntTypography key={`${suggestion.type}-${suggestion.message}`} variant="caption" color="text.secondary">
								{suggestion.message}
							</BntTypography>
						))}
					</BntStack>
				) : null}
			</BntStack>
		</DashboardWidgetCard>
	);
}
