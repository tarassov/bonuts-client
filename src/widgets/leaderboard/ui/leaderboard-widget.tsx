import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HelpOutlineOutlined } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";

import { useFormattedDate } from "@/shared/lib/date";
import type { IDashboardWidgetSizingProps } from "@/shared/ui/dashboard-widget-card";
import { DashboardWidgetCard } from "@/shared/ui/dashboard-widget-card";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useProfile } from "@/entities/profile";

import { getLeaderMedalTone, getRankedLeaderboardProfiles } from "../model/leaderboard-helper";

import { LeaderButton } from "./leader-button";
import { LeaderMedal } from "./leader-medal";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useEmployeeUi } from "@/logic/ui/use-employee-ui";
import { useGetWeeklyRecognitionBadgesLatestQuery } from "@/services/api/bonuts-api";
import { texts_l, texts_n, texts_w } from "@/services/localization/texts";

export function LeaderboardWidget({ columns = 1 }: IDashboardWidgetSizingProps) {
	const { t } = useBntTranslate();
	const { t: i18nT } = useTranslation();
	const { authTenant } = useProfile();
	const { showEmployeeModal } = useEmployeeUi();
	const { getFormattedDate } = useFormattedDate();
	const { data } = useGetWeeklyRecognitionBadgesLatestQuery({ tenant: authTenant || undefined }, { skip: !authTenant });

	const rankedProfiles = useMemo(() => getRankedLeaderboardProfiles(data?.badges || []), [data?.badges]);
	const topThree = rankedProfiles.slice(0, 5);
	const weekStart = getFormattedDate(data?.week_start);
	const weekEnd = getFormattedDate(data?.week_end);
	const hasWeekRange = Boolean(weekStart && weekEnd);
	const weekCaption = hasWeekRange ? i18nT(texts_w.week_from_to_caption, { from: weekStart, to: weekEnd }) : "";
	const weekTooltip = hasWeekRange ? i18nT(texts_w.week_from_to_tooltip, { from: weekStart, to: weekEnd }) : "";

	return (
		<DashboardWidgetCard columns={columns}>
			<BntStack gap={2}>
				<BntStack direction="row" alignItems="center" justifyContent="space-between">
					<BntTypography variant="subtitle1" fontWeight={700}>
						{t(texts_l.leaders_of_the_week, { capitalize: true })}
					</BntTypography>
					{hasWeekRange ? (
						<Tooltip title={weekTooltip}>
							<IconButton size="small" aria-label={weekCaption} sx={{ p: 0.25 }}>
								<HelpOutlineOutlined fontSize="inherit" />
							</IconButton>
						</Tooltip>
					) : null}
				</BntStack>
				{topThree.length ? (
					<BntStack gap={1.25}>
						{topThree.map((leader, index) => (
							<LeaderButton key={leader.id} onClick={() => showEmployeeModal(leader.id)}>
								<Box sx={{ minWidth: 0, flex: 1 }}>
									<BntStack direction="row" alignItems="center" gap={0.75}>
										<LeaderMedal medalTone={getLeaderMedalTone(index)} />
										<BntTypography variant="body2" fontWeight={700} noWrap>
											{leader.name}
										</BntTypography>
									</BntStack>
									<BntTypography variant="caption" color="text.secondary" noWrap>
										{leader.topBadgeTitle}
									</BntTypography>
								</Box>
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
