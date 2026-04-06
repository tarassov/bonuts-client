import { useMemo } from "react";
import { Box } from "@mui/material";

import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useProfile } from "@/entities/profile";

import type { IDashboardWidgetSizingProps } from "@/widgets/dashboard-social";
import { DashboardSocialWidgetCard } from "@/widgets/dashboard-social";
import { getLeaderMedalTone, getRankedLeaderboardProfiles } from "@/widgets/leaderboard/model/leaderboard-helper";
import { LeaderButton } from "@/widgets/leaderboard/ui/leader-button";
import { LeaderMedal } from "@/widgets/leaderboard/ui/leader-medal";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useEmployeeUi } from "@/logic/ui/use-employee-ui";
import { useGetWeeklyRecognitionBadgesLatestQuery } from "@/services/api/bonuts-api";
import { texts_l, texts_n } from "@/services/localization/texts";

export function LeaderboardWidget({ columns = 1 }: IDashboardWidgetSizingProps) {
	const { t } = useBntTranslate();
	const { authTenant } = useProfile();
	const { showEmployeeModal } = useEmployeeUi();
	const { data } = useGetWeeklyRecognitionBadgesLatestQuery({ tenant: authTenant || undefined }, { skip: !authTenant });

	const rankedProfiles = useMemo(() => getRankedLeaderboardProfiles(data?.badges || []), [data?.badges]);
	const topThree = rankedProfiles.slice(0, 3);

	return (
		<DashboardSocialWidgetCard columns={columns}>
			<BntStack gap={2}>
				<BntTypography variant="h6">{t(texts_l.leaders_of_the_week, { capitalize: true })}</BntTypography>
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
		</DashboardSocialWidgetCard>
	);
}
