import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";

import { useFormattedDate } from "@/shared/lib/date";
import { BntChip } from "@/shared/ui/chip";
import type { IDashboardWidgetSizingProps } from "@/shared/ui/dashboard-widget-card";
import { DashboardWidgetCard } from "@/shared/ui/dashboard-widget-card";
import { ProfileAvatar } from "@/shared/ui/profile-avatar";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useEmployeeUi, useProfile } from "@/entities/profile";

import { getRandomWeeklyTitleKey, getRankedLeaderboardProfiles } from "../model/leaderboard-helper";

import { LeaderButton, LeaderDetails } from "./leader-button";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useGetWeeklyRecognitionBadgesLatestQuery } from "@/services/api/bonuts-api";
import { texts_n, texts_w } from "@/services/localization/texts";

export function LeaderboardWidget({ columns = 1 }: IDashboardWidgetSizingProps) {
	const { t } = useBntTranslate();
	const { t: i18nT } = useTranslation();
	const { authTenant } = useProfile();
	const { showEmployeeModal } = useEmployeeUi();
	const { getFormattedDate } = useFormattedDate();
	const { data } = useGetWeeklyRecognitionBadgesLatestQuery({ tenant: authTenant || undefined }, { skip: !authTenant });

	const rankedProfiles = useMemo(() => getRankedLeaderboardProfiles(data?.badges || []), [data?.badges]);
	const weeklyTitleKey = useMemo(() => getRandomWeeklyTitleKey(), []);
	const topProfiles = rankedProfiles.slice(0, 5);
	const weekStart = getFormattedDate(data?.week_start, { day: "numeric", month: "short" });
	const weekEnd = getFormattedDate(data?.week_end, { day: "numeric", month: "short" });
	const hasWeekRange = Boolean(weekStart && weekEnd);
	const weekCaption = hasWeekRange ? i18nT(texts_w.week_from_to_caption, { from: weekStart, to: weekEnd }) : "";
	const weekTooltip = hasWeekRange ? i18nT(texts_w.week_from_to_tooltip, { from: weekStart, to: weekEnd }) : "";
	const title = t(weeklyTitleKey, { capitalize: true });
	const headerAction = hasWeekRange ? (
		<Tooltip title={weekTooltip}>
			<BntTypography variant="caption" color="text.secondary">
				{weekCaption}
			</BntTypography>
		</Tooltip>
	) : null;

	return (
		<DashboardWidgetCard columns={columns} headerAction={headerAction} title={title}>
			<BntStack gap={1} data-testid="dashboard-widget-leaderboard">
				{topProfiles.length ? (
					<BntStack gap={1}>
						{topProfiles.map((leader) => (
							<LeaderButton key={leader.id} onClick={() => showEmployeeModal(leader.id)}>
								<ProfileAvatar avatarUrl={leader.avatar} name={leader.name} fallback={leader.name.slice(0, 1)} />
								<LeaderDetails>
									<BntTypography variant="caption" fontWeight={700} sx={{ overflowWrap: "anywhere" }}>
										{leader.name}
									</BntTypography>
									<BntChip label={leader.topBadgeTitle} size="small" color="secondary" variant="outlined" sx={{ maxWidth: "100%", height: 22, fontSize: "0.75rem" }} />
								</LeaderDetails>
							</LeaderButton>
						))}
					</BntStack>
				) : (
					<BntTypography variant="body2" color="text.secondary">
						{t(texts_n.no_weekly_leaders_yet, { capitalize: true })}
					</BntTypography>
				)}
			</BntStack>
		</DashboardWidgetCard>
	);
}
