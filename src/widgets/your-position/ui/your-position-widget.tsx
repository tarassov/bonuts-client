import { useMemo } from "react";
import { ArrowUpwardRounded, RemoveRounded } from "@mui/icons-material";

import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useProfile } from "@/entities/profile";

import type { IDashboardWidgetSizingProps } from "@/widgets/dashboard-social";
import { DashboardSocialWidgetCard } from "@/widgets/dashboard-social";
import { getRankedPositionProfiles } from "@/widgets/your-position/model/your-position-helper";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useGetWeeklyRecognitionBadgesLatestQuery } from "@/services/api/bonuts-api";
import { texts_n, texts_y } from "@/services/localization/texts";

export function YourPositionWidget({ columns = 1 }: IDashboardWidgetSizingProps) {
	const { t } = useBntTranslate();
	const { profile, authTenant } = useProfile();
	const { data } = useGetWeeklyRecognitionBadgesLatestQuery({ tenant: authTenant || undefined }, { skip: !authTenant });

	const rankedProfiles = useMemo(() => getRankedPositionProfiles(data?.badges || []), [data?.badges]);
	const currentRank = rankedProfiles.find((item) => item.id === profile?.id);

	return (
		<DashboardSocialWidgetCard columns={columns}>
			<BntStack gap={1}>
				<BntTypography variant="subtitle1" fontWeight={700}>
					{t(texts_y.your_position, { capitalize: true })}
				</BntTypography>
				<BntStack direction="row" alignItems="center" gap={1}>
					<BntTypography variant="h4" color="primary.main">
						{currentRank ? `#${currentRank.rank}` : "—"}
					</BntTypography>
					{currentRank ? <ArrowUpwardRounded color="success" fontSize="small" /> : <RemoveRounded color="disabled" fontSize="small" />}
				</BntStack>
				<BntTypography variant="body2" color="text.secondary">
					{currentRank ? `${t("position", { capitalize: true })} ${currentRank.rank}` : t(texts_n.no_rank_yet, { capitalize: true })}
				</BntTypography>
			</BntStack>
		</DashboardSocialWidgetCard>
	);
}
